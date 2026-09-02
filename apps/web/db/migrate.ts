import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const migrationsDir = path.join(import.meta.dirname, "migrations");
const migrationFilenamePattern = /^\d{4}_[a-z0-9_]+\.sql$/;

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

await client.query(
  "create table if not exists schema_migrations (filename text primary key, applied_at timestamptz not null default now())",
);
const appliedRows = await client.query<{ filename: string }>("select filename from schema_migrations");
const applied = new Set(appliedRows.rows.map((row) => row.filename));

const files = (await readdir(migrationsDir)).sort();
const misnamed = files.filter((file) => !migrationFilenamePattern.test(file));
if (misnamed.length > 0) {
  throw new Error(`Migration files must look like 0001_create_users.sql, got: ${misnamed.join(", ")}`);
}

for (const filename of files) {
  if (applied.has(filename)) continue;
  const sql = await readFile(path.join(migrationsDir, filename), "utf8");
  await client.query("begin");
  try {
    await client.query(sql);
    await client.query("insert into schema_migrations (filename) values ($1)", [filename]);
    await client.query("commit");
    console.log(`applied ${filename}`);
  } catch (error) {
    await client.query("rollback");
    throw error;
  }
}

await client.end();

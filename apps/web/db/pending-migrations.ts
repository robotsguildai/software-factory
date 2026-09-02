export type MigrationFilename = string;

const migrationFilenamePattern = /^\d{4}_[a-z0-9_]+\.sql$/;

/** Returns the migrations that still need to run, in filename order. Rejects misnamed files. */
export function pendingMigrations(
  filesInMigrationsDir: readonly string[],
  appliedFilenames: ReadonlySet<MigrationFilename>,
): MigrationFilename[] {
  const misnamed = filesInMigrationsDir.filter(
    (file) => file !== ".gitkeep" && !migrationFilenamePattern.test(file),
  );
  if (misnamed.length > 0) {
    throw new Error(`Migration files must look like 0001_create_users.sql, got: ${misnamed.join(", ")}`);
  }
  return filesInMigrationsDir
    .filter((file) => migrationFilenamePattern.test(file) && !appliedFilenames.has(file))
    .sort();
}

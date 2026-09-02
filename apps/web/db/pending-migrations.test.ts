import assert from "node:assert/strict";
import { test } from "node:test";
import { pendingMigrations } from "./pending-migrations.ts";

test("returns unapplied migrations sorted by filename", () => {
  const pending = pendingMigrations(
    ["0002_add_projects.sql", ".gitkeep", "0001_create_users.sql", "0003_add_workspaces.sql"],
    new Set(["0001_create_users.sql"]),
  );
  assert.deepEqual(pending, ["0002_add_projects.sql", "0003_add_workspaces.sql"]);
});

test("rejects files that do not follow the numbered naming scheme", () => {
  assert.throws(() => pendingMigrations(["create-users.sql"], new Set()), /0001_create_users\.sql/);
});

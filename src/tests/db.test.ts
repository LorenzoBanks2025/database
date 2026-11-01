/** Tests connection creation, required-file behavior, and table initialization. */
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { createDatabase, loadDatabase, openDatabase } from "../db";
import { usersTable } from "../schema/usersTable";

const temporaryDirectories: string[] = [];

afterEach(() => {
    for (const directory of temporaryDirectories.splice(0)) {
        rmSync(directory, { recursive: true, force: true });
    }
});

function temporaryPath(): string {
    const directory = mkdtempSync(join(tmpdir(), "database-tests-"));
    temporaryDirectories.push(directory);
    return join(directory, "nested", "app.sqlite");
}

test("createDatabase creates parent directories and initializes users", () => {
    const connection = createDatabase(temporaryPath());

    try {
        const inserted = connection.db.insert(usersTable).values({
            firstName: "Test",
            lastName: "User",
            email: "test@example.invalid",
        }).returning().get();

        assert.ok(inserted.id);
        assert.equal(inserted.email, "test@example.invalid");
        assert.equal(inserted.avatarUrl, null);
    } finally {
        connection.close();
    }
});

test("loadDatabase opens an existing database and rejects a missing one", () => {
    const path = temporaryPath();
    const created = createDatabase(path);
    created.close();

    const loaded = loadDatabase(path);
    loaded.close();

    assert.throws(() => loadDatabase(join(dirname(path), "missing.sqlite")));
});

test("createDatabase adds avatar URLs to existing users without losing their data", () => {
    const path = temporaryPath();
    const legacy = openDatabase(path, false);

    try {
        legacy.db.$client.exec(`
            CREATE TABLE users (
                id TEXT PRIMARY KEY NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
            );
            INSERT INTO users (id, first_name, last_name, email, created_at, updated_at)
            VALUES ('existing-user', 'Existing', 'User', 'existing@example.invalid', 1, 1);
        `);
    } finally {
        legacy.close();
    }

    const connection = createDatabase(path);

    try {
        const existingUser = connection.db.select().from(usersTable).get();
        assert.equal(existingUser?.id, "existing-user");
        assert.equal(existingUser?.firstName, "Existing");
        assert.equal(existingUser?.avatarUrl, null);

        const avatarUrlColumn = connection.db.$client
            .prepare("SELECT COUNT(*) AS count FROM pragma_table_info('users') WHERE name = ?")
            .get("avatar_url");
        assert.ok(avatarUrlColumn);
    } finally {
        connection.close();
    }
});

test("openDatabase creates a database when mustExist is false", () => {
    const connection = openDatabase(temporaryPath(), false);
    connection.close();
});

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

test("openDatabase creates a database when mustExist is false", () => {
    const connection = openDatabase(temporaryPath(), false);
    connection.close();
});

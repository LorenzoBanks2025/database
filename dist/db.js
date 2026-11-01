import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSchema, initDatabaseSchema } from "./schema.js";
export function openDatabase(filename, mustExist) {
    // Relative paths are resolved from where you start Node
    const path = filename === ":memory:" ? filename : resolve(filename);
    if (!mustExist && path !== ":memory:") {
        mkdirSync(dirname(path), { recursive: true });
    }
    const sqlite = new Database(path, {
        fileMustExist: mustExist,
    });
    try {
        sqlite.pragma("journal_mode = WAL");
        sqlite.pragma("foreign_keys = ON");
        const db = drizzle(sqlite, { schema: DatabaseSchema });
        return {
            db,
            close: () => sqlite.close(),
        };
    }
    catch (error) {
        sqlite.close();
        throw error;
    }
}
// Opens an existing database; throws if the file is missing.
// Assumes its tables have already been created.
export function loadDatabase(filename) {
    return openDatabase(filename, true);
}
// Creates the file if missing, then initializes its tables.
// Existing databases and rows are preserved.
export function createDatabase(filename) {
    const connection = openDatabase(filename, false);
    try {
        initDatabaseSchema(connection.db);
        return connection;
    }
    catch (error) {
        connection.close();
        throw error;
    }
}
//# sourceMappingURL=db.js.map
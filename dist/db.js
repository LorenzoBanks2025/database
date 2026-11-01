import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSchema, initDatabaseSchema } from "./schema.js";
/**
 * Open a SQLite database and configure it for application use.
 *
 * Relative filenames resolve from the process working directory. When
 * `mustExist` is false, parent directories are created for file-backed
 * databases; `":memory:"` always opens an in-memory database.
 *
 * This function does not create or migrate application tables. Use
 * {@link createDatabase} to initialize tables, or {@link loadDatabase} to
 * require an existing file.
 *
 * @param filename SQLite filename or `":memory:"`.
 * @param mustExist If true, throw when a file-backed database does not exist.
 * @returns The open database connection and its close function.
 * @throws If the database cannot be opened or configured.
 */
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
/**
 * Open a database file that must already exist.
 *
 * This function does not create or migrate tables; the file must already
 * contain the schema expected by this package.
 *
 * @param filename Path to the existing SQLite database.
 * @returns The open database connection and its close function.
 * @throws If the file does not exist or cannot be opened.
 */
export function loadDatabase(filename) {
    return openDatabase(filename, true);
}
/**
 * Open a database and create any missing application tables.
 *
 * Existing tables and rows are preserved. This is idempotent table creation,
 * not a migration mechanism; it does not alter existing table definitions.
 *
 * @param filename SQLite filename or `":memory:"`.
 * @returns The initialized database connection and its close function.
 * @throws If opening or initializing the database fails. The connection is
 * closed before the error is rethrown.
 */
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
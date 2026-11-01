import type { Database as BetterSQLite3Client } from "better-sqlite3";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { DatabaseSchema } from "./schema.js";
/**
 * Drizzle database client configured with the application's complete schema
 * and its underlying synchronous SQLite client.
 */
export type AppDatabase = BetterSQLite3Database<typeof DatabaseSchema> & {
    $client: BetterSQLite3Client;
};
/**
 * An open database and the function that closes its SQLite connection.
 *
 * Always call {@link DatabaseConnection.close} when the connection is no
 * longer needed. Closing a connection more than once is not supported.
 */
export type DatabaseConnection = {
    /** The typed Drizzle client for the open SQLite database. */
    db: AppDatabase;
    /** Close the underlying SQLite connection and release its resources. */
    close: () => void;
};
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
export declare function openDatabase(filename: string, mustExist: boolean): DatabaseConnection;
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
export declare function loadDatabase(filename: string): DatabaseConnection;
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
export declare function createDatabase(filename: string): DatabaseConnection;
//# sourceMappingURL=db.d.ts.map
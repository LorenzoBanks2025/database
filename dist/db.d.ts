import type { Database as BetterSQLite3Client } from "better-sqlite3";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { DatabaseSchema } from "./schema.js";
export type AppDatabase = BetterSQLite3Database<typeof DatabaseSchema> & {
    $client: BetterSQLite3Client;
};
export type DatabaseConnection = {
    db: AppDatabase;
    close: () => void;
};
export declare function openDatabase(filename: string, mustExist: boolean): DatabaseConnection;
export declare function loadDatabase(filename: string): DatabaseConnection;
export declare function createDatabase(filename: string): DatabaseConnection;
//# sourceMappingURL=db.d.ts.map
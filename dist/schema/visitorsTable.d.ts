import type { BrowserFingerprint } from "../types/browserFingerprint.js";
import type { AppDatabase } from "../db.js";
/** SQLite definition of a visitor event record. */
export declare const visitorsTable: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "visitors";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "visitors";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ipAddress: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "ip_address";
            tableName: "visitors";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userAgent: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "user_agent";
            tableName: "visitors";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        visitDate: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "visit_date";
            tableName: "visitors";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        browserFingerprint: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "browser_fingerprint";
            tableName: "visitors";
            dataType: "string";
            columnType: "SQLiteText";
            data: BrowserFingerprint;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
            $type: BrowserFingerprint;
        }>;
    };
    dialect: "sqlite";
}>;
/** A visitor event row returned from the database. */
export type Visitor = typeof visitorsTable.$inferSelect;
/** Values accepted when inserting a visitor event. */
export type NewVisitor = typeof visitorsTable.$inferInsert;
/** Optional visitor fields accepted by an update operation. */
export type UpdateVisitor = Partial<NewVisitor>;
/**
 * Create the visitors table if it does not already exist.
 *
 * @param db Open application database.
 */
export declare function initVisitorsTable(db: AppDatabase): void;
//# sourceMappingURL=visitorsTable.d.ts.map
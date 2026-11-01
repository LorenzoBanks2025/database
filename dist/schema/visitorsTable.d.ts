import type { BrowserFingerprint } from "../types/browserFingerprint.js";
import type { AppDatabase } from "../db.js";
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
export type Visitor = typeof visitorsTable.$inferSelect;
export type NewVisitor = typeof visitorsTable.$inferInsert;
export type UpdateVisitor = Partial<NewVisitor>;
export declare function initVisitorsTable(db: AppDatabase): void;
//# sourceMappingURL=visitorsTable.d.ts.map
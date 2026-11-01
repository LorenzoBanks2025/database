import type Address from "../types/address.js";
import type { AppDatabase } from "../db.js";
/** List of email addresses associated with a lead. */
export type EmailList = string[];
/** List of phone numbers associated with a lead. */
export type PhoneList = string[];
/** SQLite definition of a lead record. */
export declare const leadsTable: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "leads";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        firstName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "first_name";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        middleName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "middle_name";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lastName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "last_name";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        emails: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "email";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: EmailList;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
            $type: EmailList;
        }>;
        phone: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "phone";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: PhoneList;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
            $type: PhoneList;
        }>;
        address: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "address";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: Address;
            driverParam: string;
            notNull: false;
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
            $type: Address;
        }>;
        scrapedFrom: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "scraped_from";
            tableName: "leads";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "leads";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "leads";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
/** A lead row returned from the database. */
export type Lead = typeof leadsTable.$inferSelect;
/** Values accepted when inserting a lead. */
export type NewLead = typeof leadsTable.$inferInsert;
/** Optional lead fields accepted by an update operation. */
export type UpdateLead = Partial<NewLead>;
/**
 * Create the leads table if it does not already exist.
 *
 * @param db Open application database.
 */
export declare function initLeadsTable(db: AppDatabase): void;
//# sourceMappingURL=leadsTable.d.ts.map
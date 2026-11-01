import type { Address } from "../types/address.js";
import type { AppDatabase } from "../db.js";
/** SQLite definition of a payment-card record. */
export declare const ccTable: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "credit_cards";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "credit_cards";
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
        cardholderName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "cardholder_name";
            tableName: "credit_cards";
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
        billingAddress: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "billing_address";
            tableName: "credit_cards";
            dataType: "string";
            columnType: "SQLiteText";
            data: Address;
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
            $type: Address;
        }>;
        cardNumber: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "card_number";
            tableName: "credit_cards";
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
        expirationMonth: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "expiration_month";
            tableName: "credit_cards";
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
        expirationYear: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "expiration_year";
            tableName: "credit_cards";
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
        cvv: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "cvv";
            tableName: "credit_cards";
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
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "credit_cards";
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
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "credit_cards";
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
    };
    dialect: "sqlite";
}>;
/** A payment-card row returned from the database. */
export type CreditCard = typeof ccTable.$inferSelect;
/** Values accepted when inserting a payment-card row. */
export type NewCreditCard = typeof ccTable.$inferInsert;
/** Optional payment-card fields accepted by an update operation. */
export type UpdateCreditCard = Partial<NewCreditCard>;
/**
 * Create the credit-cards table if it does not already exist.
 *
 * @param db Open application database.
 */
export declare function initCCTable(db: AppDatabase): void;
//# sourceMappingURL=ccTable.d.ts.map
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
/** SQLite definition of a payment-card record. */
export const ccTable = sqliteTable("credit_cards", {
    /** UUID generated when an ID is not supplied. */
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    /** Name printed on the card. */
    cardholderName: text("cardholder_name").notNull(),
    /** Billing address stored as JSON text; serialize before inserting. */
    billingAddress: text("billing_address")
        .notNull()
        .$type(),
    /** Card number stored as text to preserve leading zeroes. */
    cardNumber: text("card_number").notNull().unique(),
    /** Two-character expiration month. */
    expirationMonth: text("expiration_month")
        .notNull(),
    /** Two- or four-character expiration year. */
    expirationYear: text("expiration_year").notNull(),
    /** Card verification value. Stored in plaintext by this schema. */
    cvv: text("cvv").notNull(),
    /** Creation time, represented as a JavaScript `Date` by Drizzle. */
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
    /** Last update time, represented as a JavaScript `Date` by Drizzle. */
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
}, (table) => [
    check("valid_card_number", sql `LENGTH(${table.cardNumber}) IN (15, 16)`),
    check("valid_expiration_month", sql `LENGTH(${table.expirationMonth}) = 2`),
    check("valid_expiration_year", sql `LENGTH(${table.expirationYear}) IN (2, 4)`),
    check("valid_cvv", sql `LENGTH(${table.cvv}) IN (3, 4)`),
]);
/**
 * Create the credit-cards table if it does not already exist.
 *
 * @param db Open application database.
 */
export function initCCTable(db) {
    db.run(`
        CREATE TABLE IF NOT EXISTS credit_cards (
            id TEXT PRIMARY KEY NOT NULL,
            cardholder_name TEXT NOT NULL,
            billing_address TEXT NOT NULL,
            card_number TEXT NOT NULL UNIQUE,
            expiration_month TEXT NOT NULL,
            expiration_year TEXT NOT NULL,
            cvv TEXT NOT NULL,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            CHECK (LENGTH(card_number) IN (15, 16)),
            CHECK (LENGTH(expiration_month) = 2),
            CHECK (LENGTH(expiration_year) IN (2, 4)),
            CHECK (LENGTH(cvv) IN (3, 4))
        );
    `);
}
//# sourceMappingURL=ccTable.js.map
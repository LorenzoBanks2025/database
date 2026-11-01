import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
export const ccTable = sqliteTable("credit_cards", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    cardholderName: text("cardholder_name").notNull(),
    billingAddress: text("billing_address")
        .notNull()
        .$type(),
    cardNumber: text("card_number").notNull().unique(),
    expirationMonth: text("expiration_month")
        .notNull(),
    expirationYear: text("expiration_year").notNull(),
    cvv: text("cvv").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
}, (table) => [
    check("valid_card_number", sql `LENGTH(${table.cardNumber}) IN (15, 16)`),
    check("valid_expiration_month", sql `LENGTH(${table.expirationMonth}) = 2`),
    check("valid_expiration_year", sql `LENGTH(${table.expirationYear}) IN (2, 4)`),
    check("valid_cvv", sql `LENGTH(${table.cvv}) IN (3, 4)`),
]);
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
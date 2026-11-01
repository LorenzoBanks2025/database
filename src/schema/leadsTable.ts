import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import type Address from "../types/address.js";
import type { Database } from "better-sqlite3";
import type { AppDatabase } from "../db.js";

export type EmailList = string[];
export type PhoneList = string[];

export const leadsTable = sqliteTable("leads", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    firstName: text("first_name").$default(() => ""),
    middleName: text("middle_name").$default(() => ""),
    lastName: text("last_name").$default(() => ""),
    emails: text("email").$type<EmailList>().$default(() => []),
    phone: text("phone").$type<PhoneList>().$default(() => []),
    address: text("address").$type<Address>(),
    scrapedFrom: text("scraped_from").$default(() => ""),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull(),
});


export type Lead = typeof leadsTable.$inferSelect;
export type NewLead = typeof leadsTable.$inferInsert;
export type UpdateLead = Partial<NewLead>;

export function initLeadsTable(db: AppDatabase) {
    db.run(`
        CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY NOT NULL,
            first_name TEXT NOT NULL,
            middle_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            scraped_from TEXT NOT NULL,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        );
    `);
}
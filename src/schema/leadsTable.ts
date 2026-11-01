import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import type Address from "../types/address.js";
import type { Database } from "better-sqlite3";
import type { AppDatabase } from "../db.js";

/** List of email addresses associated with a lead. */
export type EmailList = string[];
/** List of phone numbers associated with a lead. */
export type PhoneList = string[];

/** SQLite definition of a lead record. */
export const leadsTable = sqliteTable("leads", {
    /** UUID generated when an ID is not supplied. */
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    /** Given name; defaults to an empty string on insert. */
    firstName: text("first_name").$default(() => ""),
    /** Optional middle name; defaults to an empty string on insert. */
    middleName: text("middle_name").$default(() => ""),
    /** Family name; defaults to an empty string on insert. */
    lastName: text("last_name").$default(() => ""),
    /** Email addresses stored as JSON text; serialize before inserting. */
    emails: text("email").$type<EmailList>().$default(() => []),
    /** Phone numbers stored as JSON text; serialize before inserting. */
    phone: text("phone").$type<PhoneList>().$default(() => []),
    /** Optional address stored as JSON text; serialize before inserting. */
    address: text("address").$type<Address>(),
    /** Source from which the lead was collected; defaults to an empty string. */
    scrapedFrom: text("scraped_from").$default(() => ""),
    /** Creation time stored as a Unix timestamp in seconds. */
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull(),
    /** Last update time stored as a Unix timestamp in seconds. */
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull(),
});


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
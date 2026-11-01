import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import type { Address } from "../types/address.js";
import { sql } from "drizzle-orm";
import type { Database } from "better-sqlite3";
import type { AppDatabase } from "../db.js";

export const fullzTable = sqliteTable("fullz", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    firstName: text("first_name"),
    middleName: text("middle_name"),
    lastName: text("last_name"),
    dateOfBirth: text("date_of_birth"),
    ssn: text("ssn"),
    address: text("address")
        .notNull()
        .$type<Address>(),
    phoneNumber: text("phone_number"),
    email: text("email"),
    mothersMaidenName: text("mothers_maiden_name"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
}, (table) => [
    check("valid_ssn", sql`LENGTH(${table.ssn}) = 9`),
]);

export type Fullz = typeof fullzTable.$inferSelect;
export type NewFullz = typeof fullzTable.$inferInsert;
export type UpdateFullz = Partial<NewFullz>;

export function initFullzTable(db: AppDatabase) {
    db.run(`
        CREATE TABLE IF NOT EXISTS fullz (
            id TEXT PRIMARY KEY NOT NULL,
            first_name TEXT,
            middle_name TEXT,
            last_name TEXT,
            date_of_birth TEXT,
            ssn TEXT,
            address TEXT NOT NULL,
            phone_number TEXT,
            email TEXT,
            mothers_maiden_name TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            CHECK (LENGTH(ssn) = 9)
        );
    `);
}

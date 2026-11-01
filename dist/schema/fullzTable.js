import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
/** SQLite definition of a personal profile record. */
export const fullzTable = sqliteTable("fullz", {
    /** UUID generated when an ID is not supplied. */
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    /** Optional given name. */
    firstName: text("first_name"),
    /** Optional middle name. */
    middleName: text("middle_name"),
    /** Optional family name. */
    lastName: text("last_name"),
    /** Optional date of birth; the schema does not enforce a format. */
    dateOfBirth: text("date_of_birth"),
    /** Optional nine-character Social Security number. Stored in plaintext. */
    ssn: text("ssn"),
    /** Required address stored as JSON text; serialize before inserting. */
    address: text("address")
        .notNull()
        .$type(),
    /** Optional phone number. */
    phoneNumber: text("phone_number"),
    /** Optional email address. */
    email: text("email"),
    /** Optional mother's maiden name. */
    mothersMaidenName: text("mothers_maiden_name"),
    /** Creation time, represented as a JavaScript `Date` by Drizzle. */
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
    /** Last update time, represented as a JavaScript `Date` by Drizzle. */
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
}, (table) => [
    check("valid_ssn", sql `LENGTH(${table.ssn}) = 9`),
]);
/**
 * Create the personal-profiles table if it does not already exist.
 *
 * @param db Open application database.
 */
export function initFullzTable(db) {
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
//# sourceMappingURL=fullzTable.js.map
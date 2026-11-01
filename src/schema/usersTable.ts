import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import type { Database } from "better-sqlite3";
import type { AppDatabase } from "../db.js";

/** SQLite definition of an application user record. */
export const usersTable = sqliteTable("users", {
    /** UUID generated when an ID is not supplied. */
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    /** User's given name. */
    firstName: text("first_name").notNull(),
    /** User's family name. */
    lastName: text("last_name").notNull(),
    /** Unique email address. */
    email: text("email").notNull().unique(),
    /** Optional URL for the user's avatar image. */
    avatarUrl: text("avatar_url"),
    /** Creation time, represented as a JavaScript `Date` by Drizzle. */
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
    /** Last update time, represented as a JavaScript `Date` by Drizzle. */
    updatedAt: integer("updated_at", { mode: "timestamp" }) 
        .notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
});

/** A user row returned from the database. */
export type User = typeof usersTable.$inferSelect;
/** Values accepted when inserting a user; database defaults may be omitted. */
export type NewUser = typeof usersTable.$inferInsert;
/** Optional user fields accepted by an update operation. */
export type UpdateUser = Partial<NewUser>;


/**
 * Create the users table if it does not already exist.
 *
 * @param db Open application database.
 */
export function initUsersTable(db: AppDatabase) {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            avatar_url TEXT,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        );
    `);

    const avatarUrlColumn = db.$client
        .prepare("SELECT name FROM pragma_table_info('users') WHERE name = ?")
        .get("avatar_url");

    if (!avatarUrlColumn) {
        db.run("ALTER TABLE users ADD COLUMN avatar_url TEXT;");
    }
}
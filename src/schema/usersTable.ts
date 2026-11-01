import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import type { Database } from "better-sqlite3";
import type { AppDatabase } from "../db.js";

export const usersTable = sqliteTable("users", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
    updatedAt: integer("updated_at", { mode: "timestamp" }) 
        .notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type UpdateUser = Partial<NewUser>;


export function initUsersTable(db: AppDatabase) {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL
        );
    `);
}
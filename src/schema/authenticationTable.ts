import { integer, index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { AppDatabase } from "../db.js";
import { usersTable } from "./usersTable.js";

/** Password credentials associated with a user account. */
export const authCredentialsTable = sqliteTable("auth_credentials", {
    userId: text("user_id")
        .primaryKey()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    passwordHash: text("password_hash").notNull(),
});

/** Server-side record for one opaque, revocable authentication token. */
export const authSessionsTable = sqliteTable("auth_sessions", {
    tokenHash: text("token_hash").primaryKey().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [
    index("auth_sessions_expires_at_idx").on(table.expiresAt),
]);

/** Stored password credential. */
export type AuthCredential = typeof authCredentialsTable.$inferSelect;
/** A new password credential to store. */
export type NewAuthCredential = typeof authCredentialsTable.$inferInsert;
/** Stored authentication session. */
export type AuthSession = typeof authSessionsTable.$inferSelect;
/** A new authentication session to store. */
export type NewAuthSession = typeof authSessionsTable.$inferInsert;

/** Create the password credential and session tables when they are missing. */
export function initAuthenticationTables(db: AppDatabase): void {
    db.run(`
        CREATE TABLE IF NOT EXISTS auth_credentials (
            user_id TEXT PRIMARY KEY NOT NULL
                REFERENCES users(id) ON DELETE CASCADE,
            password_hash TEXT NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS auth_sessions (
            token_hash TEXT PRIMARY KEY NOT NULL,
            user_id TEXT NOT NULL
                REFERENCES users(id) ON DELETE CASCADE,
            expires_at INTEGER NOT NULL
        );
    `);

    db.run(`
        CREATE INDEX IF NOT EXISTS auth_sessions_expires_at_idx
        ON auth_sessions(expires_at);
    `);
}

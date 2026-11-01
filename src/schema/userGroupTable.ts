import { sql } from "drizzle-orm";
import { check, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { AppDatabase } from "../db.js";
import { usersTable } from "./usersTable.js";

/** Roles that may be assigned to an application user. */
export type UserRole = "admin" | "user";

/** SQLite definition of a user's single role assignment. */
export const userGroupTable = sqliteTable("user_groups", {
    /** User ID; one role assignment exists per user. */
    userId: text("user_id")
        .primaryKey()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    /** Assigned privilege level; new users default to the least-privileged role. */
    role: text("role", { enum: ["admin", "user"] })
        .notNull()
        .default("user"),
}, (table) => [
    check("valid_user_group_role", sql`${table.role} IN ('admin', 'user')`),
]);

/** A user's role assignment returned from the database. */
export type UserGroup = typeof userGroupTable.$inferSelect;
/** Values accepted when creating a user role assignment. */
export type NewUserGroup = typeof userGroupTable.$inferInsert;
/** Fields that may be changed on a user role assignment. */
export type UpdateUserGroup = Partial<NewUserGroup>;

/**
 * Create the user role table, populate missing assignments, and ensure future
 * user inserts receive the default role.
 *
 * Existing role assignments, including administrator roles, are preserved.
 * The trigger covers both Drizzle model writes and direct SQL inserts.
 *
 * @param db Open application database with the users table initialized.
 */
export function initUserGroupTable(db: AppDatabase): void {
    db.run(`
        CREATE TABLE IF NOT EXISTS user_groups (
            user_id TEXT PRIMARY KEY NOT NULL
                REFERENCES users(id) ON DELETE CASCADE,
            role TEXT NOT NULL DEFAULT 'user',
            CHECK (role IN ('admin', 'user'))
        );
    `);

    db.run(`
        INSERT OR IGNORE INTO user_groups (user_id, role)
        SELECT id, 'user' FROM users;
    `);

    db.run(`
        CREATE TRIGGER IF NOT EXISTS users_default_user_group
        AFTER INSERT ON users
        FOR EACH ROW
        BEGIN
            INSERT OR IGNORE INTO user_groups (user_id, role)
            VALUES (NEW.id, 'user');
        END;
    `);
}

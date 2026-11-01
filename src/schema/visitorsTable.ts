import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { BrowserFingerprint } from "../types/browserFingerprint.js";
import type { Database } from "better-sqlite3";
import type { AppDatabase } from "../db.js";

export const visitorsTable = sqliteTable("visitors", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    ipAddress: text("ip_address").notNull(),
    userAgent: text("user_agent").notNull(),
    visitDate: integer("visit_date", { mode: "timestamp" }).notNull()
        .$default(() => sql`(strftime('%s', 'now'))`),
    browserFingerprint: text("browser_fingerprint").$type<BrowserFingerprint>().notNull(),
}, (table) => [
    check("valid_ip_address", sql`LENGTH(${table.ipAddress}) <= 45`),
    check("valid_user_agent", sql`LENGTH(${table.userAgent}) <= 255`),
]);

export type Visitor = typeof visitorsTable.$inferSelect;
export type NewVisitor = typeof visitorsTable.$inferInsert;
export type UpdateVisitor = Partial<NewVisitor>;


export function initVisitorsTable(db: AppDatabase) {
    db.run(`
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT NOT NULL,
            user_agent TEXT NOT NULL,
            visit_date INTEGER NOT NULL,
            browser_fingerprint TEXT NOT NULL,
            CHECK (LENGTH(ip_address) <= 45),
            CHECK (LENGTH(user_agent) <= 255)
        );
    `);
}
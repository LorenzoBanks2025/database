import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
/** SQLite definition of a visitor event record. */
export const visitorsTable = sqliteTable("visitors", {
    /** Auto-incrementing database-generated identifier. */
    id: integer("id").primaryKey({ autoIncrement: true }),
    /** Client IP address, limited to 45 characters. */
    ipAddress: text("ip_address").notNull(),
    /** User-agent string, limited to 255 characters. */
    userAgent: text("user_agent").notNull(),
    /** Visit time, represented as a JavaScript `Date` by Drizzle. */
    visitDate: integer("visit_date", { mode: "timestamp" }).notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
    /** Browser fingerprint stored as JSON text; serialize before inserting. */
    browserFingerprint: text("browser_fingerprint").$type().notNull(),
}, (table) => [
    check("valid_ip_address", sql `LENGTH(${table.ipAddress}) <= 45`),
    check("valid_user_agent", sql `LENGTH(${table.userAgent}) <= 255`),
]);
/**
 * Create the visitors table if it does not already exist.
 *
 * @param db Open application database.
 */
export function initVisitorsTable(db) {
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
//# sourceMappingURL=visitorsTable.js.map
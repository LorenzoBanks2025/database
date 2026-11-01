import { sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const visitorsTable = sqliteTable("visitors", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    ipAddress: text("ip_address").notNull(),
    userAgent: text("user_agent").notNull(),
    visitDate: integer("visit_date", { mode: "timestamp" }).notNull()
        .$default(() => sql `(strftime('%s', 'now'))`),
    browserFingerprint: text("browser_fingerprint").$type().notNull(),
}, (table) => [
    check("valid_ip_address", sql `LENGTH(${table.ipAddress}) <= 45`),
    check("valid_user_agent", sql `LENGTH(${table.userAgent}) <= 255`),
]);
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
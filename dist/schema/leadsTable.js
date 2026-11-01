import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
export const leadsTable = sqliteTable("leads", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUID()),
    firstName: text("first_name").$default(() => ""),
    middleName: text("middle_name").$default(() => ""),
    lastName: text("last_name").$default(() => ""),
    emails: text("email").$type().$default(() => []),
    phone: text("phone").$type().$default(() => []),
    address: text("address").$type(),
    scrapedFrom: text("scraped_from").$default(() => ""),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull(),
});
export function initLeadsTable(db) {
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
//# sourceMappingURL=leadsTable.js.map
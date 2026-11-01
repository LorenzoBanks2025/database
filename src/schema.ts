import { initUsersTable, usersTable } from "./schema/usersTable.js";
import { initCCTable, ccTable } from "./schema/ccTable.js";
import { initVisitorsTable, visitorsTable } from "./schema/visitorsTable.js";
import { initFullzTable, fullzTable } from "./schema/fullzTable.js";
import { initLeadsTable, leadsTable } from "./schema/leadsTable.js";
import { initUserGroupTable, userGroupTable } from "./schema/userGroupTable.js";
import type { AppDatabase } from "./db.js";

/**
 * Drizzle table definitions registered on the application database client.
 *
 * This object is used by Drizzle for typed queries; it does not itself create
 * the corresponding tables in SQLite.
 */
export const DatabaseSchema = {
    /** User records. */
    usersTable,
    /** One administrator or user role assignment per user. */
    userGroupTable,
    /** Payment-card records. */
    ccTable,
    /** Visitor event records. */
    visitorsTable,
    /** Personal profile records. */
    fullzTable,
    /** Lead records. */
    leadsTable
};

/**
 * Create each application table when it does not already exist.
 *
 * This is safe to call repeatedly but does not migrate or modify tables that
 * already exist.
 *
 * @param db Open application database to initialize.
 */
export const initDatabaseSchema = (db: AppDatabase) => {
    initUsersTable(db);
    initUserGroupTable(db);
    initCCTable(db);
    initVisitorsTable(db);
    initFullzTable(db);
    initLeadsTable(db);
}

import { initUsersTable, usersTable } from "./schema/usersTable.js";
import { initCCTable, ccTable } from "./schema/ccTable.js";
import { initVisitorsTable, visitorsTable } from "./schema/visitorsTable.js";
import { initFullzTable, fullzTable } from "./schema/fullzTable.js";
import { initLeadsTable, leadsTable } from "./schema/leadsTable.js";
import type { AppDatabase } from "./db.js";

export const DatabaseSchema = {
    usersTable,
    ccTable,
    visitorsTable,
    fullzTable,
    leadsTable
};

export const initDatabaseSchema = (db: AppDatabase) => {
    initUsersTable(db);
    initCCTable(db);
    initVisitorsTable(db);
    initFullzTable(db);
    initLeadsTable(db);
}

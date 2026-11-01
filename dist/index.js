/**
 * Public entry point for database lifecycle functions, schema definitions,
 * typed row shapes, and CRUD models.
 *
 * JSON-shaped values in text columns must be encoded as JSON strings before
 * they are written and decoded by the caller when read. This package provides
 * schema typing, not automatic serialization or encryption.
 *
 * @packageDocumentation
 */
export { createDatabase, loadDatabase, openDatabase } from "./db.js";
export { DatabaseSchema, initDatabaseSchema } from "./schema.js";
export { CreditCardModel } from "./models/ccModel.js";
export { FullzModel } from "./models/fullzModel.js";
export { LeadsModel } from "./models/leadsModel.js";
export { UserModel } from "./models/userModel.js";
export { VisitorsModel } from "./models/visitorsModel.js";
export { ccTable, initCCTable } from "./schema/ccTable.js";
export { fullzTable, initFullzTable } from "./schema/fullzTable.js";
export { leadsTable, initLeadsTable } from "./schema/leadsTable.js";
export { usersTable, initUsersTable } from "./schema/usersTable.js";
export { initVisitorsTable, visitorsTable } from "./schema/visitorsTable.js";
//# sourceMappingURL=index.js.map
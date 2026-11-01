/** Tests schema registration, declared constraints, and SQLite enforcement. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { getTableConfig } from "drizzle-orm/sqlite-core";
import { DatabaseSchema } from "../schema";
import { ccTable } from "../schema/ccTable";
import { fullzTable } from "../schema/fullzTable";
import { leadsTable } from "../schema/leadsTable";
import { userGroupTable } from "../schema/userGroupTable";
import { usersTable } from "../schema/usersTable";
import { visitorsTable } from "../schema/visitorsTable";
import { createTestDatabase } from "./testDatabase";

test("schema exports the user table used by the database connection", () => {
    assert.equal(DatabaseSchema.usersTable, usersTable);
    assert.deepEqual(Object.keys(DatabaseSchema), [
        "usersTable",
        "userGroupTable",
        "authCredentialsTable",
        "authSessionsTable",
        "ccTable",
        "visitorsTable",
        "fullzTable",
        "leadsTable",
    ]);
});

test("table definitions expose the expected columns and constraints", () => {
    assert.deepEqual(getTableConfig(ccTable).checks.map(({ name }) => name), [
        "valid_card_number",
        "valid_expiration_month",
        "valid_expiration_year",
        "valid_cvv",
    ]);
    assert.deepEqual(getTableConfig(fullzTable).checks.map(({ name }) => name), ["valid_ssn"]);
    assert.deepEqual(getTableConfig(visitorsTable).checks.map(({ name }) => name), [
        "valid_ip_address",
        "valid_user_agent",
    ]);
    assert.equal(getTableConfig(usersTable).columns.find(({ name }) => name === "email")?.isUnique, true);
    assert.deepEqual(getTableConfig(userGroupTable).checks.map(({ name }) => name), ["valid_user_group_role"]);
    assert.equal(getTableConfig(leadsTable).name, "leads");
});

test("SQLite constraints enforce the declared schema formats", () => {
    const connection = createTestDatabase();
    const sqlite = connection.db.$client;

    try {
        const insertCard = sqlite.prepare(`
            INSERT INTO credit_cards
                (id, cardholder_name, billing_address, card_number, expiration_month, expiration_year, cvv, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const card = ["valid", "Test", "{}", "340000000000000", "12", "30", "1234", 0, 0] as const;
        insertCard.run(...card);

        assert.throws(() => insertCard.run("bad-number", "Test", "{}", "12345678901234", "12", "30", "123", 0, 0));
        assert.throws(() => insertCard.run("bad-cvv", "Test", "{}", "340000000000001", "12", "30", "12345", 0, 0));
        assert.throws(() => sqlite.prepare(`
            INSERT INTO fullz (id, ssn, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?)
        `).run("bad-ssn", "12345678", "{}", 0, 0));
        assert.throws(() => sqlite.prepare(`
            INSERT INTO visitors (ip_address, user_agent, visit_date, browser_fingerprint) VALUES (?, ?, ?, ?)
        `).run("1".repeat(46), "Test", 0, "{}"));
        assert.ok(Number(sqlite.prepare(`
            INSERT INTO visitors (ip_address, user_agent, visit_date, browser_fingerprint) VALUES (?, ?, ?, ?)
        `).run("192.0.2.1", "Test", 0, "{}").lastInsertRowid) > 0);
    } finally {
        connection.close();
    }
});

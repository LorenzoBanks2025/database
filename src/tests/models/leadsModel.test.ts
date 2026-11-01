/** Tests lead lookup filters and create, update, and delete behavior. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { LeadsModel } from "../../models/leadsModel";
import type { Address } from "../../types/address";
import { createTestDatabase } from "../testDatabase";

const address: Address = {
    city: "Test City",
    state: "TS",
    postalCode: "12345",
    country: "US",
};
const addressJson = JSON.stringify(address);

test("LeadsModel filters by profile and address and supports CRUD operations", () => {
    const connection = createTestDatabase();
    const sqlite = connection.db.$client;
    const model = new LeadsModel(connection);

    try {
        sqlite.prepare(`
            INSERT INTO leads
                (id, first_name, middle_name, last_name, email, phone, address, scraped_from, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run("lead-1", "Test", "Q", "Person", JSON.stringify(["test@example.invalid"]), JSON.stringify(["5550100"]), addressJson, "example.invalid", 0, 0);

        assert.equal(model.findById("lead-1")?.id, "lead-1");
        assert.equal(model.findByEmail("test@example.invalid")?.id, "lead-1");
        assert.equal(model.findByPhone("5550100")?.id, "lead-1");
        assert.equal(model.findByScrapedFrom("example.invalid").length, 1);
        assert.equal(model.findByFirstName("Test").length, 1);
        assert.equal(model.findByLastName("Person").length, 1);
        assert.equal(model.findByFullName("Test", "Person").length, 1);
        assert.equal(model.findByCity("Test City").length, 1);
        assert.equal(model.findByState("TS").length, 1);
        assert.equal(model.findByCountry("US").length, 1);
        assert.equal(model.findByZipCode("12345").length, 1);
        assert.equal(model.findAll().length, 1);
        assert.equal(model.update("lead-1", { firstName: "Updated" })?.firstName, "Updated");
        assert.equal(model.delete("lead-1")?.id, "lead-1");
    } finally {
        connection.close();
    }
});

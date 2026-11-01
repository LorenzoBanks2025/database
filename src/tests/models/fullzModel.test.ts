import assert from "node:assert/strict";
import { test } from "node:test";
import { FullzModel } from "../../models/fullzModel";
import type { Address } from "../../types/address";
import { createTestDatabase } from "../testDatabase";

const address: Address = {
    city: "Test City",
    state: "TS",
    postalCode: "12345",
    country: "US",
};
const addressJson = JSON.stringify(address);
const storedAddress = addressJson as unknown as Address;

test("FullzModel searches profile fields and supports CRUD operations", () => {
    const connection = createTestDatabase();
    const sqlite = connection.db.$client;
    const model = new FullzModel(connection);

    try {
        sqlite.prepare(`
            INSERT INTO fullz
                (id, first_name, middle_name, last_name, date_of_birth, ssn, address, phone_number, email, mothers_maiden_name, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run("fullz-1", "Test", "Q", "Person", "2000-01-01", "000000000", addressJson, "5550100", "test@example.invalid", "Example", 0, 0);

        assert.equal(model.findById("fullz-1")?.id, "fullz-1");
        assert.equal(model.findBySSN("000000000")?.id, "fullz-1");
        assert.equal(model.findByEmail("test@example.invalid")?.id, "fullz-1");
        assert.equal(model.findByPhoneNumber("5550100")?.id, "fullz-1");
        assert.equal(model.findByMothersMaidenName("Example")?.id, "fullz-1");
        assert.equal(model.findByDateOfBirth("2000-01-01").length, 1);
        assert.equal(model.findByLastName("Person").length, 1);
        assert.equal(model.findByFirstName("Test").length, 1);
        assert.equal(model.findByMiddleName("Q").length, 1);
        assert.equal(model.findByCountry("US").length, 1);
        assert.equal(model.findByState("TS").length, 1);
        assert.equal(model.findByCity("Test City").length, 1);
        assert.equal(model.findByZipCode("12345").length, 1);
        assert.equal(model.findAll().length, 1);
        assert.equal(model.update("fullz-1", { firstName: "Updated" })?.firstName, "Updated");
        assert.equal(model.delete("fullz-1")?.id, "fullz-1");

        const created = model.create({
            address: storedAddress,
            ssn: "111111111",
        });
        assert.ok(model.findById(created.id));
    } finally {
        connection.close();
    }
});

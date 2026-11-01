/** Tests card lookup filters and create, update, and delete behavior. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { CreditCardModel } from "../../models/ccModel";
import type { Address } from "../../types/address";
import { createTestDatabase } from "../testDatabase";

const address: Address = {
    city: "Test City",
    state: "TS",
    postalCode: "12345",
    country: "US",
};
const storedAddress = JSON.stringify(address) as unknown as Address;

test("CreditCardModel filters cards and supports CRUD operations", () => {
    const connection = createTestDatabase();
    const sqlite = connection.db.$client;
    const model = new CreditCardModel(connection);

    try {
        const cards = [
            ["visa", "4000000000000000", "US"],
            ["mastercard", "5100000000000000", "CA"],
            ["amex", "340000000000000", "US"],
            ["discover", "6011000000000000", "US"],
        ] as const;

        for (const [id, cardNumber, country] of cards) {
            sqlite.prepare(`
                INSERT INTO credit_cards
                    (id, cardholder_name, billing_address, card_number, expiration_month, expiration_year, cvv, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(id, "Test Cardholder", JSON.stringify({ ...address, country }), cardNumber, "12", "30", "123", 0, 0);
        }

        assert.equal(model.findByBin("400000").length, 1);
        assert.equal(model.findByLast4("0000").length, 4);
        assert.equal(model.findByCardNumber("340000000000000")?.id, "amex");
        assert.equal(model.findByExpiryMonth("12").length, 4);
        assert.equal(model.findByExpiryYear("30").length, 4);
        assert.equal(model.findByExpiryDate("12", "30").length, 4);
        assert.equal(model.findByCountry("CA")[0]?.id, "mastercard");
        assert.equal(model.findByState("TS").length, 4);
        assert.equal(model.findByCity("Test City").length, 4);
        assert.equal(model.findByZipCode("12345").length, 4);
        assert.equal(model.findByCardholderName("Test Cardholder").length, 4);
        assert.equal(model.findAllVisaCards()[0]?.id, "visa");
        assert.equal(model.findAllMasterCardCards()[0]?.id, "mastercard");
        assert.equal(model.findAllAmexCards()[0]?.id, "amex");
        assert.equal(model.findAllDiscoverCards()[0]?.id, "discover");
        assert.equal(model.findAll().length, 4);

        const created = model.create({
            cardholderName: "New Cardholder",
            billingAddress: storedAddress,
            cardNumber: "4111111111111111",
            expirationMonth: "01",
            expirationYear: "2030",
            cvv: "1234",
        });
        assert.equal(model.findById(created.id)?.cardNumber, created.cardNumber);
        assert.equal(model.update(created.id, { cardholderName: "Updated" })?.cardholderName, "Updated");
        assert.equal(model.delete(created.id)?.id, created.id);
    } finally {
        connection.close();
    }
});

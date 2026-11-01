import assert from "node:assert/strict";
import { test } from "node:test";
import type { Address } from "../../types/address";

test("Address accepts its documented fields", () => {
    const address: Address = {
        line1: "1 Test Street",
        city: "Test City",
        state: "TS",
        postalCode: "12345",
        country: "US",
    };

    assert.equal(address.postalCode, "12345");
});

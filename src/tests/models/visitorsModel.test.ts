import assert from "node:assert/strict";
import { test } from "node:test";
import { VisitorsModel } from "../../models/visitorsModel";
import type { BrowserFingerprint } from "../../types/browserFingerprint";
import { createTestDatabase } from "../testDatabase";

test("VisitorsModel filters by identity and date range and supports CRUD operations", () => {
    const connection = createTestDatabase();
    const model = new VisitorsModel(connection);

    try {
        const visitDate = new Date("2026-01-15T12:00:00.000Z");
        const created = model.create({
            id: 1,
            ipAddress: "192.0.2.1",
            userAgent: "Test Agent",
            visitDate,
            browserFingerprint: "{}" as unknown as BrowserFingerprint,
        });

        assert.equal(model.findById(created.id)?.ipAddress, created.ipAddress);
        assert.equal(model.findByIpAddress("192.0.2.1").length, 1);
        assert.equal(model.findByUserAgent("Test Agent").length, 1);
        assert.equal(model.findByIpAndUserAgent("192.0.2.1", "Test Agent").length, 1);
        assert.deepEqual(
            model.findByVisitDateRange(new Date("2026-01-15T00:00:00.000Z"), new Date("2026-01-16T00:00:00.000Z")).map(({ id }) => id),
            [created.id],
        );
        assert.equal(model.findByVisitDateRange(new Date("2026-01-16T00:00:00.000Z"), new Date("2026-01-17T00:00:00.000Z")).length, 0);
        assert.equal(model.findAll().length, 1);
        assert.equal(model.update(created.id, { userAgent: "Updated Agent" })?.userAgent, "Updated Agent");
        assert.equal(model.delete(created.id)?.id, created.id);
    } finally {
        connection.close();
    }
});

/** Tests user lookup, list, create, update, and delete behavior. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { UserModel } from "../../models/userModel";
import { createTestDatabase } from "../testDatabase";

test("UserModel supports lookup, CRUD, and list operations", () => {
    const connection = createTestDatabase();
    const model = new UserModel(connection);

    try {
        const created = model.create({
            firstName: "Test",
            lastName: "User",
            email: "test@example.invalid",
            avatarUrl: "https://example.invalid/avatar.png",
        });

        assert.equal(model.count(), 1);
        assert.equal(model.findById(created.id)?.email, created.email);
        assert.equal(model.findByEmail(created.email)?.id, created.id);
        assert.equal(model.findById(created.id)?.avatarUrl, "https://example.invalid/avatar.png");
        assert.deepEqual(model.findAll().map(({ id }) => id), [created.id]);
        const updated = model.update(created.id, {
            firstName: "Updated",
            avatarUrl: "https://example.invalid/updated.png",
        });
        assert.equal(updated?.firstName, "Updated");
        assert.equal(updated?.avatarUrl, "https://example.invalid/updated.png");
        assert.equal(model.delete(created.id)?.id, created.id);
        assert.equal(model.findById(created.id), undefined);
        assert.equal(model.count(), 0);
    } finally {
        connection.close();
    }
});

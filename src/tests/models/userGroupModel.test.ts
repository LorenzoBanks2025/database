/** Tests default role assignment, role lookup, replacement, and cascading deletion. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { UserGroupModel } from "../../models/userGroupModel";
import { initDatabaseSchema } from "../../schema";
import { initUsersTable } from "../../schema/usersTable";
import { openDatabase } from "../../db";

test("UserGroupModel assigns defaults and manages user roles", () => {
    const connection = openDatabase(":memory:", false);
    const sqlite = connection.db.$client;

    try {
        initUsersTable(connection.db);
        sqlite.prepare(`
            INSERT INTO users (id, first_name, last_name, email, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run("existing-user", "Existing", "User", "existing@example.invalid", 0, 0);

        initDatabaseSchema(connection.db);
        const model = new UserGroupModel(connection);

        assert.equal(model.findRoleByUserId("existing-user"), "user");
        assert.equal(model.isAdmin("existing-user"), false);
        assert.equal(model.setRole("existing-user", "admin").role, "admin");
        assert.equal(model.isAdmin("existing-user"), true);

        initDatabaseSchema(connection.db);
        assert.equal(model.findByUserId("existing-user")?.role, "admin");

        sqlite.prepare(`
            INSERT INTO users (id, first_name, last_name, email, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run("new-user", "New", "User", "new@example.invalid", 0, 0);
        assert.equal(model.findRoleByUserId("new-user"), "user");

        assert.throws(() => sqlite.prepare(`
            INSERT INTO user_groups (user_id, role) VALUES (?, ?)
        `).run("existing-user", "owner"));

        sqlite.prepare("DELETE FROM users WHERE id = ?").run("new-user");
        assert.equal(model.findByUserId("new-user"), undefined);
        assert.equal(model.findRoleByUserId("missing-user"), undefined);
        assert.throws(() => model.setRole("missing-user", "admin"));
    } finally {
        connection.close();
    }
});

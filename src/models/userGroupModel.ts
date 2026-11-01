import { eq } from "drizzle-orm";
import type { DatabaseConnection } from "../db.js";
import {
    userGroupTable,
    type UserGroup,
    type UserRole,
} from "../schema/userGroupTable.js";

/** Read and manage the single privilege role assigned to each user. */
export class UserGroupModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(private readonly connection: DatabaseConnection) {}

    /** Find a user's role assignment, or `undefined` if the user does not exist. */
    findByUserId(userId: string): UserGroup | undefined {
        return this.connection.db
            .select()
            .from(userGroupTable)
            .where(eq(userGroupTable.userId, userId))
            .get();
    }

    /** Find the privilege role for a user, if the user exists. */
    findRoleByUserId(userId: string): UserRole | undefined {
        return this.findByUserId(userId)?.role;
    }

    /** Return whether the existing user has the administrator role. */
    isAdmin(userId: string): boolean {
        return this.findRoleByUserId(userId) === "admin";
    }

    /**
     * Assign or replace a user's role.
     *
     * Call this only from trusted authorization logic. The model stores a role
     * but does not authenticate callers or enforce permissions for other data.
     *
     * @param userId ID of an existing user.
     * @param role Role to assign.
     * @returns The saved assignment.
     * @throws If the user does not exist or the database write fails.
     */
    setRole(userId: string, role: UserRole): UserGroup {
        return this.connection.db
            .insert(userGroupTable)
            .values({ userId, role })
            .onConflictDoUpdate({
                target: userGroupTable.userId,
                set: { role },
            })
            .returning()
            .get();
    }
}

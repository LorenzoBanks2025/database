import type { DatabaseConnection } from "../db.js";
import type { User, NewUser, UpdateUser } from "../schema/usersTable.js";
/** Query and mutate application user rows. */
export declare class UserModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection);
    private connection;
    /** Find one user by its unique identifier. */
    findById(id: string): User | undefined;
    /** Find one user by its unique email address. */
    findByEmail(email: string): User | undefined;
    /** Return every user row. */
    findAll(): User[];
    /** Insert a user and return the inserted row. */
    create(user: NewUser): User;
    /**
     * Update a user and return the updated row, if one matched.
     *
     * @param id Identifier of the user to update.
     * @param user Fields to update.
     */
    update(id: string, user: UpdateUser): User | undefined;
    /** Delete a user and return the deleted row, if one matched. */
    delete(id: string): User | undefined;
}
//# sourceMappingURL=userModel.d.ts.map
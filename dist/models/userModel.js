import { usersTable } from "../schema/usersTable.js";
import { eq } from "drizzle-orm";
/** Query and mutate application user rows. */
export class UserModel {
    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    /** Find one user by its unique identifier. */
    findById(id) {
        return this.connection.db.select().from(usersTable).where(eq(usersTable.id, id)).get();
    }
    /** Find one user by its unique email address. */
    findByEmail(email) {
        return this.connection.db.select().from(usersTable).where(eq(usersTable.email, email)).get();
    }
    /** Return every user row. */
    findAll() {
        return this.connection.db.select().from(usersTable).all();
    }
    /** Insert a user and return the inserted row. */
    create(user) {
        return this.connection.db.insert(usersTable).values(user).returning().get();
    }
    /**
     * Update a user and return the updated row, if one matched.
     *
     * @param id Identifier of the user to update.
     * @param user Fields to update.
     */
    update(id, user) {
        return this.connection.db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning().get();
    }
    /** Delete a user and return the deleted row, if one matched. */
    delete(id) {
        return this.connection.db.delete(usersTable).where(eq(usersTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=userModel.js.map
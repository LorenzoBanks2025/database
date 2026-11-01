import { usersTable } from "../schema/usersTable.js";
import { eq } from "drizzle-orm";
export class UserModel {
    constructor(connection) {
        this.connection = connection;
    }
    connection;
    findById(id) {
        return this.connection.db.select().from(usersTable).where(eq(usersTable.id, id)).get();
    }
    findByEmail(email) {
        // Implementation to find a user by email
        return this.connection.db.select().from(usersTable).where(eq(usersTable.email, email)).get();
    }
    findAll() {
        // Implementation to find all users
        return this.connection.db.select().from(usersTable).all();
    }
    create(user) {
        // Implementation to create a new user
        return this.connection.db.insert(usersTable).values(user).returning().get();
    }
    update(id, user) {
        // Implementation to update an existing user
        return this.connection.db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning().get();
    }
    delete(id) {
        // Implementation to delete a user by ID
        return this.connection.db.delete(usersTable).where(eq(usersTable.id, id)).returning().get();
    }
}
//# sourceMappingURL=userModel.js.map
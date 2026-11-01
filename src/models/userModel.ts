import type { DatabaseConnection } from "../db.js";
import { usersTable } from "../schema/usersTable.js";
import type { User, NewUser, UpdateUser } from "../schema/usersTable.js";
import { sql, eq } from "drizzle-orm";

export class UserModel {

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;


    findById(id: string): User | undefined {
        return this.connection.db.select().from(usersTable).where(eq(usersTable.id, id)).get();
    }

    findByEmail(email: string): User | undefined {
        // Implementation to find a user by email
        return this.connection.db.select().from(usersTable).where(eq(usersTable.email, email)).get();
    }

    findAll(): User[] {
        // Implementation to find all users
        return this.connection.db.select().from(usersTable).all();
    }

    create(user: NewUser): User {
        // Implementation to create a new user
        return this.connection.db.insert(usersTable).values(user).returning().get();
    }

    update(id: string, user: UpdateUser): User | undefined {
        // Implementation to update an existing user
        return this.connection.db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning().get();
    }

    delete(id: string): User | undefined {
        // Implementation to delete a user by ID
        return this.connection.db.delete(usersTable).where(eq(usersTable.id, id)).returning().get();
    }



}
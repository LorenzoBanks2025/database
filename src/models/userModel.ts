import type { DatabaseConnection } from "../db.js";
import { usersTable } from "../schema/usersTable.js";
import type { User, NewUser, UpdateUser } from "../schema/usersTable.js";
import { sql, eq } from "drizzle-orm";

/** Query and mutate application user rows. */
export class UserModel {

    /**
     * Create a model bound to an open database connection.
     *
     * @param connection Connection that remains open for the model's lifetime.
     */
    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    private connection: DatabaseConnection;


    /** Find one user by its unique identifier. */
    findById(id: string): User | undefined {
        return this.connection.db.select().from(usersTable).where(eq(usersTable.id, id)).get();
    }

    /** Find one user by its unique email address. */
    findByEmail(email: string): User | undefined {
        return this.connection.db.select().from(usersTable).where(eq(usersTable.email, email)).get();
    }

    /** Return every user row. */
    findAll(): User[] {
        return this.connection.db.select().from(usersTable).all();
    }

    /** Insert a user and return the inserted row. */
    create(user: NewUser): User {
        return this.connection.db.insert(usersTable).values(user).returning().get();
    }

    /**
     * Update a user and return the updated row, if one matched.
     *
     * @param id Identifier of the user to update.
     * @param user Fields to update.
     */
    update(id: string, user: UpdateUser): User | undefined {
        return this.connection.db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning().get();
    }

    /** Delete a user and return the deleted row, if one matched. */
    delete(id: string): User | undefined {
        return this.connection.db.delete(usersTable).where(eq(usersTable.id, id)).returning().get();
    }



}
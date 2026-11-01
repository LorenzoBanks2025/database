import type { DatabaseConnection } from "../db.js";
import type { User, NewUser, UpdateUser } from "../schema/usersTable.js";
export declare class UserModel {
    constructor(connection: DatabaseConnection);
    private connection;
    findById(id: string): User | undefined;
    findByEmail(email: string): User | undefined;
    findAll(): User[];
    create(user: NewUser): User;
    update(id: string, user: UpdateUser): User | undefined;
    delete(id: string): User | undefined;
}
//# sourceMappingURL=userModel.d.ts.map
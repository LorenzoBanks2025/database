import { DatabaseConnection, createDatabase } from "../db";

export function createTestDatabase(): DatabaseConnection {
    return createDatabase(":memory:");
}

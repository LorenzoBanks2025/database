import { DatabaseConnection, createDatabase } from "../db";

/**
 * Create an initialized in-memory database for an isolated test.
 *
 * The caller owns the returned connection and must close it after the test.
 *
 * @returns An initialized in-memory database connection.
 */
export function createTestDatabase(): DatabaseConnection {
    return createDatabase(":memory:");
}

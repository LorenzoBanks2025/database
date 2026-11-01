import { eq, lt } from "drizzle-orm";
import type { DatabaseConnection } from "../db.js";
import {
    authCredentialsTable,
    authSessionsTable,
    type AuthCredential,
    type AuthSession,
    type NewAuthSession,
} from "../schema/authenticationTable.js";

/** Store and query password credentials and revocable authentication sessions. */
export class AuthenticationModel {
    constructor(private readonly connection: DatabaseConnection) {}

    /** Find a user's stored password credential. */
    findCredentialByUserId(userId: string): AuthCredential | undefined {
        return this.connection.db
            .select()
            .from(authCredentialsTable)
            .where(eq(authCredentialsTable.userId, userId))
            .get();
    }

    /** Store a password hash for a user who does not already have credentials. */
    createCredential(userId: string, passwordHash: string): AuthCredential {
        return this.connection.db
            .insert(authCredentialsTable)
            .values({ userId, passwordHash })
            .returning()
            .get();
    }

    /** Persist a new token hash and its expiry. */
    createSession(session: NewAuthSession): AuthSession {
        return this.connection.db
            .insert(authSessionsTable)
            .values(session)
            .returning()
            .get();
    }

    /** Find a session by the hash of its bearer token. */
    findSessionByTokenHash(tokenHash: string): AuthSession | undefined {
        return this.connection.db
            .select()
            .from(authSessionsTable)
            .where(eq(authSessionsTable.tokenHash, tokenHash))
            .get();
    }

    /** Revoke the session associated with a token hash. */
    deleteSessionByTokenHash(tokenHash: string): void {
        this.connection.db
            .delete(authSessionsTable)
            .where(eq(authSessionsTable.tokenHash, tokenHash))
            .run();
    }

    /** Remove expired sessions and return the number removed. */
    deleteExpiredSessions(now: Date = new Date()): number {
        return this.connection.db
            .delete(authSessionsTable)
            .where(lt(authSessionsTable.expiresAt, now))
            .run().changes;
    }
}

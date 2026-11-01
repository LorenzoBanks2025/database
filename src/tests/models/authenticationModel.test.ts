/** Tests credential storage and authentication session lifecycle operations. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { AuthenticationModel } from "../../models/authenticationModel";
import { UserModel } from "../../models/userModel";
import { createTestDatabase } from "../testDatabase";

test("AuthenticationModel stores credentials and creates revocable sessions", () => {
    const connection = createTestDatabase();
    const users = new UserModel(connection);
    const authentication = new AuthenticationModel(connection);

    try {
        const user = users.create({
            firstName: "Test",
            lastName: "User",
            email: "auth@example.invalid",
        });
        const credential = authentication.createCredential(user.id, "scrypt-hash");
        const expiredSession = authentication.createSession({
            tokenHash: "expired-token-hash",
            userId: user.id,
            expiresAt: new Date(1_000),
        });
        const activeSession = authentication.createSession({
            tokenHash: "active-token-hash",
            userId: user.id,
            expiresAt: new Date(3_000),
        });

        assert.equal(authentication.findCredentialByUserId(user.id)?.passwordHash, credential.passwordHash);
        assert.equal(
            authentication.findSessionByTokenHash(expiredSession.tokenHash)?.userId,
            user.id,
        );
        assert.equal(authentication.deleteExpiredSessions(new Date(2_000)), 1);
        assert.equal(authentication.findSessionByTokenHash(expiredSession.tokenHash), undefined);
        assert.equal(
            authentication.findSessionByTokenHash(activeSession.tokenHash)?.userId,
            user.id,
        );

        authentication.deleteSessionByTokenHash(activeSession.tokenHash);
        assert.equal(authentication.findSessionByTokenHash(activeSession.tokenHash), undefined);
        users.delete(user.id);
        assert.equal(authentication.findCredentialByUserId(user.id), undefined);
    } finally {
        connection.close();
    }
});

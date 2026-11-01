import assert from "node:assert/strict";
import { test } from "node:test";
import type { BrowserFingerprint } from "../../types/browserFingerprint";

test("BrowserFingerprint accepts its documented fields", () => {
    const fingerprint: BrowserFingerprint = {
        userAgent: "Test Agent",
        language: "en",
        screenResolution: [1920, 1080],
        touchSupport: {
            maxTouchPoints: 1,
            touchEvent: true,
            touchStart: true,
        },
    };

    assert.deepEqual(fingerprint.screenResolution, [1920, 1080]);
});

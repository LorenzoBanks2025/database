import { test } from "node:test";

test("the package index module can be loaded", async () => {
    await import("../index");
});

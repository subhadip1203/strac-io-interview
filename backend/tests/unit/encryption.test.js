require("dotenv").config();
const assert = require("assert");
const { hashToken } = require("../../src/helpers/encryption");

describe("Encryption Helper", () => {
    it("should hash a token with a salt", () => {
        const hashed = hashToken("test-token");
        assert.strictEqual(typeof hashed, "string");
        assert.strictEqual(hashed.length > 0, true);
    });

    it("should produce consistent hashes for the same token", () => {
        const hash1 = hashToken("test-token");
        const hash2 = hashToken("test-token");
        assert.strictEqual(hash1, hash2);
    });

    it("should produce different hashes for different tokens", () => {
        const hash1 = hashToken("test-token");
        const hash2 = hashToken("another-token");
        assert.notStrictEqual(hash1, hash2);
    });
});

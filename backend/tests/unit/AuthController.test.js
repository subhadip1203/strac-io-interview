require("dotenv").config();
const assert = require("assert");
const sinon = require("sinon");
const { getAuthUrl } = require("../../src/services/authService");

describe("AuthService - Google OAuth URL", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should return a valid Google OAuth URL", () => {
        // Call the actual method
        const authUrl = getAuthUrl();

        // Assert that a valid URL is returned
        assert(authUrl.startsWith("https://accounts.google.com"), "Google OAuth URL not generated");
        assert(authUrl.includes("redirect_uri="), "Missing redirect_uri parameter");
        assert(authUrl.includes("scope="), "Missing scope parameter");
        assert(authUrl.includes("client_id="), "Missing client_id parameter");
    });
});
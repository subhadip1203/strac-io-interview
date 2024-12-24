const crypto = require("crypto");

function hashToken(token) {
    // Use the HASH_SALT environment variable
    const salt = process.env.HASH_SALT;
    if (!salt) {
        throw new Error("HASH_SALT environment variable is not defined");
    }
    return crypto.createHmac("sha256", salt).update(token).digest("hex");
}

module.exports = { hashToken };
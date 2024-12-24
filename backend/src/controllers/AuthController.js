const { getAuthUrl, getTokens } = require("../services/authService");
const { hashToken } = require("../helpers/encryption");

function getAuthUrlHandler(req, res) {
    const url = getAuthUrl();
    res.send({ url });
}

async function handleCallback(req, res) {
    try {
        const code = req.query.code;
        const googleTokens = await getTokens(code);

        const {access_token, expiry_date} = googleTokens
        const hashedToken = hashToken(access_token)

        res.cookie("hashedToken", hashedToken, {
            httpOnly: true,   // Prevents access from JavaScript
            secure: false,    
        });
        res.send({ message: "Authentication successful", tokens:{access_token, expiry_date} });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).send("Authentication failed");
    }
}

module.exports = { getAuthUrlHandler, handleCallback };

const e = require("express");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.FRONTEND_URL+'/auth/callback'
);

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.FRONTEND_URL) {
    throw new Error("Missing required environment variables for OAuth2");
}

function getAuthUrl() {
    const scopes = [
        "https://www.googleapis.com/auth/drive",
    ];
    return oauth2Client.generateAuthUrl({
        access_type: "online", // Only access token, no refresh token
        scope: scopes,
    });
}

async function getTokens(code) {
    try{
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        return tokens;
    } catch(error){
        throw new Error('Failed to retrieve access token');
    }
   
}

module.exports = { getAuthUrl, getTokens, oauth2Client };

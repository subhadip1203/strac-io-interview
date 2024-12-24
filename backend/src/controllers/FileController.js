const {
    listFiles,
    uploadFile,
    downloadFile,
    deleteFile,
} = require("../services/FileService");
const { oauth2Client } = require("../services/authService");

async function listFilesHandler(req, res) {
    try {
        const userToken = req.headers.authorization; 
        if (!userToken) {
            return res.status(401).send("Unauthorized: Token missing");
        }
        const folderId = req.query.folderid || null; // Get the folderId from query parameters
        oauth2Client.setCredentials({ access_token: userToken });
        const files = await listFiles(oauth2Client, folderId);
        res.send(files);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to list files");
    }
}

async function uploadFileHandler(req, res) {
    const { path, originalname } = req.file;
    const userToken = req.headers.authorization; 
    if (!userToken) {
        return res.status(401).send("Unauthorized: Token missing");
    }

    try {
        const folderId = req.body.folderid || null; // Get the folderId from query parameters
        oauth2Client.setCredentials({ access_token: userToken }); // Set user's token
        const fileId = await uploadFile(oauth2Client, path, originalname , folderId);
        res.status(201).send({ fileId });
    } catch (error) {
        res.status(500).send("Failed to upload file");
    }
}

async function downloadFileHandler(req, res) {
    const fileId = req.params.id;
    const userToken = req.headers.authorization; // Assuming the token is sent in the `Authorization` header
    if (!userToken) {
        return res.status(401).send("Unauthorized: Token missing");
    }

    try {
        oauth2Client.setCredentials({ access_token: userToken }); // Set user's token
        await downloadFile(oauth2Client, fileId, res);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to download file");
    }
}

async function deleteFileHandler(req, res) {
    const fileId = req.params.id;
    const userToken = req.headers.authorization; // Assuming the token is sent in the `Authorization` header
    if (!userToken) {
        return res.status(401).send("Unauthorized: Token missing");
    }

    try {
        oauth2Client.setCredentials({ access_token: userToken }); // Set user's token
        const message = await deleteFile(oauth2Client, fileId);
        res.send(message);
    } catch (error) {
        res.status(500).send("Failed to delete file");
    }
}

module.exports = { listFilesHandler, uploadFileHandler, downloadFileHandler, deleteFileHandler };

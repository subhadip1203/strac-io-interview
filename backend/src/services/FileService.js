// const { google } = require("googleapis");
// const fs = require("fs");

// function createDriveClient(authClient) {
//     return google.drive({ version: "v3", auth: authClient });
// }

// async function listFiles(authClient) {
//     const drive = createDriveClient(authClient);
//     const response = await drive.files.list({
//         fields: "files(id, name, mimeType, modifiedTime)",
//     });
//     return response.data.files;
// }

// async function uploadFile(authClient, filePath, fileName) {
//     const drive = createDriveClient(authClient);
//     const fileMetadata = { name: fileName };
//     const media = { body: fs.createReadStream(filePath) };

//     const response = await drive.files.create({
//         resource: fileMetadata,
//         media: media,
//         fields: "id",
//     });

//     fs.unlinkSync(filePath); // Clean up
//     return response.data.id;
// }

// async function downloadFile(authClient, fileId, res) {
//     const drive = createDriveClient(authClient);
//     const response = await drive.files.get(
//         { fileId, alt: "media" },
//         { responseType: "stream" }
//     );
//     response.data.pipe(res);
// }

// async function deleteFile(authClient, fileId) {
//     const drive = createDriveClient(authClient);
//     await drive.files.delete({ fileId });
//     return { message: "File deleted successfully" };
// }

// module.exports = { listFiles, uploadFile, downloadFile, deleteFile };


const { google } = require("googleapis");
const fs = require("fs");

// Helper to create Google Drive client
function createDriveClient(authClient) {
    return google.drive({ version: "v3", auth: authClient });
}

// List files in a specific folder or the root folder
async function listFiles(authClient, folderId = null) {
    const drive = createDriveClient(authClient);

    // Construct the query to filter by folder
    const query = folderId ? `'${folderId}' in parents and trashed = false` : "trashed = false";

    const response = await drive.files.list({
        q: query, // Apply the query
        fields: "files(id, name, mimeType, modifiedTime)",
    });

    return response.data.files;
}

// Upload a file to a specific folder or the root folder
async function uploadFile(authClient, filePath, fileName, folderId = null) {
    const drive = createDriveClient(authClient);

    // File metadata, including the parent folder if folderId is provided
    const fileMetadata = {
        name: fileName,
        ...(folderId && { parents: [folderId] }), // Include folderId if provided
    };

    const media = {
        body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
    });

    // delete the local file from server after uploading
    fs.unlinkSync(filePath);

    return response.data.id;
}

async function downloadFile(authClient, fileId, res) {
    const drive = createDriveClient(authClient);

    try {
        // First, attempt to get the file's metadata to check if it's a Google Docs file
        const fileMetadata = await drive.files.get({
            fileId: fileId,
            fields: 'mimeType'
        });

        const mimeType = fileMetadata.data.mimeType;

        if (mimeType.startsWith('application/vnd.google-apps')) {
            // If it's a Google Docs, Sheets, or Slides file, use export
            const exportMimeType = getExportMimeType(mimeType); // Function to map mimeType to export format
            const exportResponse = await drive.files.export({
                fileId: fileId,
                mimeType: exportMimeType
            }, { responseType: 'stream' });

            // Pipe the export stream to the response
            exportResponse.data.pipe(res);
            console.log("Exported and downloaded the file as", exportMimeType);
        } else {
            // If it's a binary file, directly download it
            const fileResponse = await drive.files.get({
                fileId: fileId,
                alt: 'media',
                responseType: 'stream'
            });

            // Pipe the binary stream to the response
            fileResponse.data.pipe(res);
            console.log("Downloaded the binary file.");
        }
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).send("Failed to download file");
    }
}

// Function to map Google Docs mimeType to export format
function getExportMimeType(mimeType) {
    switch (mimeType) {
        case 'application/vnd.google-apps.document':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';  // Google Docs to DOCX
        case 'application/vnd.google-apps.spreadsheet':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';  // Google Sheets to XLSX
        case 'application/vnd.google-apps.presentation':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';  // Google Slides to PPTX
        default:
            throw new Error("Unsupported Google file type for export.");
    }
}


// Delete a file from Google Drive
async function deleteFile(authClient, fileId) {
    const drive = createDriveClient(authClient);

    await drive.files.delete({ fileId });

    return { message: "File deleted successfully", fileId };
}

// Find a folder by name and return its ID
async function findFolderByName(authClient, folderName) {
    const drive = createDriveClient(authClient);

    const response = await drive.files.list({
        q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: "files(id, name)",
    });

    const folders = response.data.files;

    if (folders.length) {
        return folders[0].id; // Return the first matching folder ID
    } else {
        return null; // Folder not found
    }
}

// Create a folder in Google Drive
async function createFolder(authClient, folderName, parentFolderId = null) {
    const drive = createDriveClient(authClient);

    const fileMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        ...(parentFolderId && { parents: [parentFolderId] }), // Set parent folder if provided
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        fields: "id",
    });

    return response.data.id;
}

module.exports = {
    listFiles,
    uploadFile,
    downloadFile,
    deleteFile,
    findFolderByName,
    createFolder,
};


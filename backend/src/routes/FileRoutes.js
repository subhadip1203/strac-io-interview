const express = require("express");
const multer = require("multer");
const {
    listFilesHandler,
    uploadFileHandler,
    downloadFileHandler,
    deleteFileHandler,
} = require("../controllers/FileController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", listFilesHandler);
router.post("/upload", upload.single("file"), uploadFileHandler);
router.get("/download/:id", downloadFileHandler);
router.delete("/:id", deleteFileHandler);

module.exports = router;

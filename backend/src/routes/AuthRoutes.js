const express = require("express");
const { getAuthUrlHandler, handleCallback } = require("../controllers/AuthController");

const router = express.Router();

router.get("/", getAuthUrlHandler);
router.get("/callback", handleCallback);

module.exports = router;

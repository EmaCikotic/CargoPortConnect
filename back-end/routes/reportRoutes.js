// routes/reportRoutes.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const reportController = require("../controllers/reportController");

const upload = multer({ storage: multer.memoryStorage() });

// MUST be this:
router.post("/", upload.array("attachments", 5), reportController.addReport);

module.exports = router;

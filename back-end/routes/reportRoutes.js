const express = require("express");
const multer = require("multer");
const router = express.Router();
const reportController = require("../controllers/reportController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.array("attachments", 5), reportController.addReport); //
router.get("/", reportController.getAllReports); //
router.get("/user/:userId", reportController.getReportsByUserId);

module.exports = router;

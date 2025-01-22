const express = require("express");
const router = express.Router();
const containerController = require("../controllers/containerController");
const { verifyToken } = require("../middleware/auth");

router.post("/addcontainer", verifyToken, containerController.addContainer);

module.exports = router;

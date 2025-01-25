const express = require("express");
const router = express.Router();
const containerController = require("../controllers/containerController");
const { verifyToken } = require("../middleware/auth");

router.post("/addcontainer", verifyToken, containerController.addContainer);
router.get("/filter", verifyToken, containerController.getFilteredContainers);

module.exports = router;

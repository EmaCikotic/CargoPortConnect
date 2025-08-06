const express = require("express");
const router = express.Router();
const containerController = require("../controllers/containerController");

router.post("/addcontainer", containerController.addContainer);
router.get("/filter", containerController.getFilteredContainers);
router.get("/user/:userId", containerController.getContainersByUserId);
router.get("/container/:id", containerController.getContainerById); 

module.exports = router;

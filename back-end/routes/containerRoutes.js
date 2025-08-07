const express = require("express");
const router = express.Router();
const containerController = require("../controllers/containerController");

router.post("/addcontainer", containerController.addContainer);
router.get("/filter", containerController.getFilteredContainers);
router.get("/user/:userId", containerController.getContainersByUserId);
router.get("/", containerController.getAllContainers);
router.get("/container/:id", containerController.getContainerById);
router.delete("/container/:id", containerController.deleteContainerById);
router.put("/container/:id", containerController.updateContainerById);

module.exports = router;

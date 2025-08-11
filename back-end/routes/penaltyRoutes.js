
const express = require("express");
const router = express.Router();
const penaltyCtrl = require("../controllers/penaltyController");


router.post("/", penaltyCtrl.create);


router.get("/", penaltyCtrl.listAll);
router.get("/container/:containerId", penaltyCtrl.listForContainer);
router.get("/user/:userId", penaltyCtrl.listForUser);

module.exports = router;

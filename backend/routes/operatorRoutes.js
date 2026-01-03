const express = require("express");
const router = express.Router();
const controller = require("../controllers/operatorController");

router.get("/prescriptions", controller.getAllPrescriptions);
router.post("/assign-slot", controller.assignSlot);

module.exports = router;

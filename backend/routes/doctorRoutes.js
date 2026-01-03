const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorController");

router.post("/create-prescription", controller.createPrescription);

module.exports = router;

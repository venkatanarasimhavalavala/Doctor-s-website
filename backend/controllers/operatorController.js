const { prescriptions } = require("../models/prescriptionModel");

exports.getAllPrescriptions = (req, res) => {
  res.json(prescriptions);
};

exports.assignSlot = (req, res) => {
  const { prescriptionId, motorSlot, expiryTime } = req.body;

  const p = prescriptions.find(x => x.prescriptionId === prescriptionId);
  if (!p) return res.status(404).json({ message: "Not found" });

  p.motorSlot = motorSlot;
  p.expiryTime = expiryTime;
  p.status = "READY";

  res.json({ message: "Slot assigned", prescription: p });
};

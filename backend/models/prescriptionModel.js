const { v4: uuidv4 } = require("uuid");

let prescriptions = [];

function createPrescription(data) {
  const prescription = {
    prescriptionId: uuidv4(),
    patientName: data.patientName || "Patient",
    patientEmail: data.patientEmail,
    medicines: data.medicines,
    motorSlot: null,
    expiryTime: null,
    status: "PENDING"
  };
  prescriptions.push(prescription);
  return prescription;
}

module.exports = { prescriptions, createPrescription };

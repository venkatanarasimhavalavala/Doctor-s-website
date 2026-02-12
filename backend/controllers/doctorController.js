const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const { createPrescription } = require("../models/prescriptionModel");

exports.createPrescription = async (req, res) => {
  try {
    const { patientName, patientEmail, medicines } = req.body;

    if (!patientEmail || !medicines || !medicines.length) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const prescription = createPrescription({
      patientName,
      patientEmail,
      medicines
    });

    const qrPayload = {
      prescriptionId: prescription.prescriptionId,
      medicines
    };

    const qrBuffer = await QRCode.toBuffer(JSON.stringify(qrPayload));

    // ✅ SMTP CONFIG (NOT service:gmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "valavalavenkatanarasimha@gmail.com",
        pass: "oekvmejmmdwbweri"
      }
    });

    const medText = medicines
      .map(m => `${m.name} - ${m.qty}`)
      .join("<br>");

    await transporter.sendMail({
      from: "valavalavenkatanarasimha@gmail.com",
      to: patientEmail,
      subject: "Your Prescription QR Code",
      html: `
        <p><b>Prescribed Medicines:</b></p>
        <p>${medText}</p>
        <p>Please show this QR code at the dispenser:</p>
        <img src="cid:qrcode"/>
      `,
      attachments: [
        {
          filename: "prescription_qr.png",
          content: qrBuffer,
          cid: "qrcode"
        }
      ]
    });

    res.json({
      message: "Prescription created",
      prescriptionId: prescription.prescriptionId,
      medicines
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

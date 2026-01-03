const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const doctorRoutes = require("./routes/doctorRoutes");
const operatorRoutes = require("./routes/operatorRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/doctor", doctorRoutes);
app.use("/api/operator", operatorRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

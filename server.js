const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const imeiRoutes = require("./routes/imeiRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
if (!fs.existsSync("./processed")) fs.mkdirSync("./processed");

app.use("/api", imeiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const upload = require("../middleware/upload");
const { processIMEIFile } = require("../controllers/imeiController");

const router = express.Router();

router.post("/upload", upload.single("file"), processIMEIFile);

module.exports = router;

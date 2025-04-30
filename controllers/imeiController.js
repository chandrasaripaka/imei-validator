const fs = require("fs");
const csv = require("csv-parser");
const { validateIMEI } = require("../utils/imeiApi");

async function processIMEIFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      if (row.imei) {
        results.push(row.imei);
      }
    })
    .on("end", async () => {
      const serviceType = req.body.serviceType || "basic";
      const validationResults = [];

      for (const imei of results) {
        const data = await validateIMEI(imei, serviceType);
        validationResults.push({ imei, data });
      }

      const outputFilePath = `./processed/imei-results-${Date.now()}.json`;
      fs.writeFileSync(outputFilePath, JSON.stringify(validationResults, null, 2));

      res.setHeader("Content-Disposition", "attachment; filename=imei-results.json");
      res.setHeader("Content-Type", "application/json");
      res.sendFile(outputFilePath, { root: "." }, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ message: "Error downloading file" });
        }
        setTimeout(() => fs.unlinkSync(outputFilePath), 5000);
      });
    });
}

module.exports = { processIMEIFile };

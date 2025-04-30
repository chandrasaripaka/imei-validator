const axios = require("axios");
require("dotenv").config();

const IMEI_API_URL = "https://imei.org/api-connect";
const API_KEY = process.env.IMEI_API_KEY;

async function validateIMEI(imei, serviceType) {
  try {
    const response = await axios.post(IMEI_API_URL, {
      api_key: API_KEY,
      imei: imei,
      service_type: serviceType,
    });

    if (response.data.success) {
      return response.data.result;
    } else {
      return { error: response.data.message };
    }
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = { validateIMEI };

const axios = require('axios');
const mongoose = require('mongoose'); // Added to cleanly handle DB lifecycle
const { getBitgetHeaders } = require('../Utils/BidgetUtils');
const dotenv = require("dotenv");
const subAccountModel = require('../Models/SubAccountModel');
const path = require('path');
const connectDatabase = require('../CONFIG_DB/connectDb');

// Forces dotenv to look in the root folder relative to this directory
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("Debug: API_KEY is loaded:", process.env.BITGET_API_KEY ? "YES" : "NO");

const API_KEY = process.env.BITGET_API_KEY;
const SECRET_KEY = process.env.BITGET_SECRET_KEY;
const PASSPHRASE = process.env.BITGET_PASSPHRASE;
const BASE_URL = 'https://api.bitget.com';

/**
 * Creates a sub-account via Broker API  
 */
const createSubAccount = async (email, label) => {
  const endpointPath = '/api/v2/broker/account/create-subaccount';
  const body = {
    subaccountName: email,
    label: label
  };

  const headers = getBitgetHeaders('POST', endpointPath, body, API_KEY, SECRET_KEY, PASSPHRASE);

  try {
    const response = await axios.post(`${BASE_URL}${endpointPath}`, body, { headers });
    const bitgetData = response.data;

    if (bitgetData.code !== "00000") {
      return { success: false, email, error: bitgetData.msg };
    }

    const subAccountId = bitgetData.data?.subUid || bitgetData.data?.[0]?.subUid;

    // Save to MongoDB safely
    await subAccountModel.create({ email, label, subAccountId });

    return { success: true, email, data: bitgetData };

  } catch (error) {
    let errMsg = error.message;
    if (error.response) {
      errMsg = `API [${error.response.status}]: ${JSON.stringify(error.response.data)}`;
    }
    return {
      success: false,
      email,
      error: errMsg
    };
  }
};

/**
 * Executes the batch creation using alias emails
 * @param {number} startRange - Starting index number (starts at 2)
 * @param {number} count - Total accounts to attempt (set to 2)
 */
const runBatchCreation = async (startRange = 2, count = 2) => {
  console.log(`🚀 Starting batch verification from index ${startRange} for ${count} accounts...`);

  const baseEmail = "testuserdev";
  const domain = "sproutpay.net";
  const endRange = startRange + count - 1;

  for (let i = startRange; i <= endRange; i++) {
    const emailAlias = `${baseEmail}${i}@${domain}`;
    const label = `SproutPay_Sub_${i}`;

    console.log(`\n[PROCESSING] Account (${i}/${endRange}) Creating ${emailAlias}...`);

    const result = await createSubAccount(emailAlias, label);

    if (result && result.success) {
      console.log(` ✅ [SUCCESS] Created sub-account wallet: ${result.email}`);
    } else {
      console.error(` ❌ [FAILED] Could not create ${emailAlias}:`, result?.error || "Unknown Error");
    }

    if (i < endRange) {
      console.log(`Waiting 1500ms for next slot...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log('\n🏁 Batch process completed.');
};

// EXECUTOR BLOCK: Only executes automatically if run directly via Node
if (require.main === module) {
  (async () => {
    try {
      await connectDatabase()
      console.log("Database state verified via helper function.");

      // 2. Start at index 21 to clearly test if the 20-wallet limit restriction was lifted
      await runBatchCreation(21, 3);

    } catch (err) {
      console.error("Critical batch initialization error:", err);
    } finally {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        console.log("Database connection closed cleanly.");
      }
      process.exit(0);
    }
  })();
}

module.exports = createSubAccount;
const axios = require('axios');
const { getBitgetHeaders } = require('../Utils/BidgetUtils');

const dotenv = require("dotenv");
// dotenv.config()
const subAccountModel = require('../Models/SubAccountModel');
// Configuration
// const API_KEY = process.env.BITGET_API_KEY;
// const SECRET_KEY = process.env.BITGET_SECRET_KEY;
// const PASSPHRASE = process.env.BITGET_PASSPHRASE;
const BASE_URL = 'https://api.bitget.com';

/**
 * Creates a sub-account via Broker API  
 */

// At the very top of CreateSubAccount.js
const path = require('path');

// This forces it to look in the root, no matter where you run the command from
dotenv.config({ path: path.join(__dirname, '../.env') });

// Now check if it loaded
console.log("Debug: API_KEY is:", process.env.BITGET_API_KEY);
// console.log(API_KEY);


const API_KEY = process.env.BITGET_API_KEY;
const SECRET_KEY = process.env.BITGET_SECRET_KEY;
const PASSPHRASE = process.env.BITGET_PASSPHRASE;

const createSubAccount = async (email, label) => {
  const path = '/api/v2/broker/account/create-subaccount';
  const body = {
    subAccountList: [email],
    label: label
  };

  const headers = getBitgetHeaders('POST', path, body, API_KEY, SECRET_KEY, PASSPHRASE);

  try {
    // 1. Call Bitget API
    const response = await axios.post(`${BASE_URL}${path}`, body, { headers });

    // 2. Extract data (Assuming API returns the ID in data)
    // Note: Verify the exact path to the ID in your API response (e.g., response.data.data.subAccountList[0].subAccountId)
    const bitgetData = response.data;
    const subAccountId = bitgetData.data[0].subAccountId;



    // 3. Store in MongoDB
    const newSubAccount = await subAccountModel.create({
      email, label, subAccountId
    })



    if (newSubAccount) {
      return {
        success: true,
        email,
        data: bitgetData

      }
    }
  }
  catch (error) {
    if (error.response) {
      // This will print exactly what the API rejected
      console.error("API Rejected Request. Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error:", error.message);
    }
  }
}

createSubAccount("testuser0@sproutpay.net", "Test_Account_Single")



module.exports = createSubAccount



/**
 * Executes the batch creation
 */
// const runBatchCreation = async (count = 21) => {
//   console.log(`Starting creation of ${count} sub-accounts...`);

//   for (let i = 1; i <= count; i++) {
//     const email = `testuser${i}@sproutpay.net`;
//     const label = `Test_Account_${i}`;

//     const result = await createSubAccount(email, label);

//     if (result.success) {
//       console.log(`[SUCCESS] Created: ${result.email}`);
//     } else {
//       console.error(`[FAILED] Could not create ${email}:`, result.error);
//     }

//     // Rate limiting: Wait 1 second between requests to avoid hitting limits
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   }

//   console.log('Batch process completed.');
// }

// // Run the script
// runBatchCreation(21);
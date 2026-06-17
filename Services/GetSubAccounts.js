const axios = require('axios');
const { getBitgetHeaders } = require('../Utils/BidgetUtils');
const dotenv = require("dotenv");
const path = require('path');
const mongoose = require("mongoose");
const connectDatabase = require('../CONFIG_DB/connectDb');
dotenv.config({ path:'/home/emma/Documents/Bitget_Backend/.env'});



console.log("Debug: API_KEY is loaded:", process.env.BITGET_API_KEY ? "YES" : "NO");

const API_KEY = process.env.BITGET_API_KEY;
const SECRET_KEY = process.env.BITGET_SECRET_KEY;
const PASSPHRASE = process.env.BITGET_PASSPHRASE;
const BASE_URL = 'https://api.bitget.com';

const getSubAccountList = async()=>{
const endpointPath = "/api/v2/broker/account/subaccount-list"  //Sub-Accounts Created
// const endTime = Date.now()
// const startTime = endTime - (90 * 24 * 60 * 60  * 1000)
// const endpointPath = `/api/v2/broker/subaccounts?pageNo=1&pageSize=50&startTime=${startTime}&endTime=${endTime}`
const method = "GET"
    const headers = getBitgetHeaders(method, endpointPath, "", API_KEY,SECRET_KEY, PASSPHRASE);
    try {
        const response = await axios.get(`${BASE_URL}${endpointPath}`,{
            headers : headers
        })
        console.log("Sub Accounts Retrieved :", JSON.stringify(response.data,null,2))
        return response.data
    } catch (error) {
        console.error("API ERROR: ", error.response ? error.response.data : error.message)
    }
}


// if (require.main === module) {
//   (async () => {
//     try {
//       await connectDatabase();
//       console.log("Database state verified.");

//       // 1. Run the batch creation
//       await runBatchCreation(30, 2);

//       // 2. Automatically verify and log the new capacity
//       console.log("\n🔍 Verifying updated broker capacity...");
//       const infoResponse = await axios.get(`${BASE_URL}/api/v2/broker/account/subaccount-list`, { 
//           headers: await getBitgetHeaders('GET', '/api/v2/broker/account/subaccount-list', '', API_KEY, SECRET_KEY, PASSPHRASE) 
//       });
      
//       const newSize = infoResponse.data.data.subAccountSize;
//       console.log(`✅ Current Sub-Account Usage: ${newSize} / 200`);
//       console.log("Status confirmed for reporting.");

//     } catch (err) {
//       console.error("Critical batch initialization error:", err);
//     } finally {
//       if (mongoose.connection.readyState !== 0) {
//         await mongoose.disconnect();
//         console.log("Database connection closed cleanly.");
//       }
//       process.exit(0);
//     }
//   })();
// }
getSubAccountList()
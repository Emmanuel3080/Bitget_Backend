const axios = require('axios');
const { getBitgetHeaders } = require('../Utils/BidgetUtils');
const dotenv = require("dotenv");
const path = require('path');
const mongoose = require("mongoose");
const connectDatabase = require('../CONFIG_DB/connectDb');
dotenv.config({ path: '/home/emma/Documents/Bitget_Backend/.env' });

console.log("Debug: API_KEY is loaded:", process.env.BITGET_API_KEY ? "YES" : "NO");

const API_KEY = process.env.BITGET_API_KEY;
const SECRET_KEY = process.env.BITGET_SECRET_KEY;
const PASSPHRASE = process.env.BITGET_PASSPHRASE;
const BASE_URL = 'https://api.bitget.com';



const CreateSubAccountApiKey = async (subUid) => {
    const endPointPath = "/api/v2/broker/manage/create-subaccount-apikey"

    const method = "POST"

    const requestBody = {
        subUid: subUid,
        passphrase: "Testuser01",
        label: "Auto-Assigned-Key",
        ipList: ["104.207.74.175"], // REPLACE with your server's actual IP
        permType: "readonly",
        permList: ["spot_trade"]
    };

    const headers = getBitgetHeaders(method, endPointPath, requestBody, API_KEY, SECRET_KEY, PASSPHRASE);
    try {
        const response = await axios.post(`${BASE_URL}${endPointPath}`, requestBody, {
            headers: headers
        });


        console.log("API Key Created Successfully:", response.data);
        return response.data;

       




    }
    catch (error) {
         console.error("CREATE API KEY ERROR: ", error.response ? error.response.data : error.message);
    }
}




CreateSubAccountApiKey("6957249359")
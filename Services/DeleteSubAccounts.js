const axios = require('axios');
const { getBitgetHeaders } = require("../Utils/BidgetUtils");
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
const deleteSubAccountApiKey = async (subUid, apiKey) => {
    const endPointPath = "/api/v2/broker/manage/delete-subaccount-apikey";
    const method = "POST";

    const requestBody = {
        subUid: subUid,
        apiKey: apiKey
    };

    const headers = getBitgetHeaders(method, endPointPath, requestBody, API_KEY, SECRET_KEY, PASSPHRASE);

    try {
        const response = await axios.post(`${BASE_URL}${endPointPath}`, requestBody, {
            headers: headers
        });
        
        console.log("SUCCESS: API Key deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("DELETE ERROR: ", error.response ? error.response.data : error.message);
    }
};

deleteSubAccountApiKey("6738283867", "bg_11ad2f66f2d95c3ee08bd75f086e2826");
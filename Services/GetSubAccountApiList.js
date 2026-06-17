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


const getSubAccountApiList = async () => {
    const endPointPath = `/api/v2/broker/manage/subaccount-apikey-list?subUid=${6957249359}`

    const method = "GET"
    const headers = getBitgetHeaders(method, endPointPath, "", API_KEY, SECRET_KEY, PASSPHRASE)
    // console.log(headers);

    try {

        const response = await axios.get(`${BASE_URL}${endPointPath}`, {
            headers: headers
        })
        console.log("Sub Accounts Retrieved", response.data)
        return response.data
    } catch (error) {
        console.error("API ERROR: ", error.response ? error.response.data : error.message)

    }
}

getSubAccountApiList()
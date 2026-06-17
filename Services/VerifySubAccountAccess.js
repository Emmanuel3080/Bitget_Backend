const axios = require('axios');
const { getBitgetHeaders } = require('../Utils/BidgetUtils'); 

// REPLACE with the values you saved from the 'create' response
const SUB_API_KEY = "bg_6f39f22d1123146dc6c534289550d095";
const SUB_SECRET_KEY = "4e42dee3f6fdf3a3cde730edfb24d8455a44b7a088263f2ead459b3a05a7ebd9";
const SUB_PASSPHRASE = "Testuser01"; 
const BASE_URL = 'https://api.bitget.com';

const verifySubAccountAccess = async () => {
    const endPointPath = "/api/v2/broker/account/info"; // Endpoint to check sub-account info
    const method = "GET";

    // IMPORTANT: Generate headers using the SUB-ACCOUNT credentials, not the Master ones
    const headers = getBitgetHeaders(method, endPointPath, "", SUB_API_KEY, SUB_SECRET_KEY, SUB_PASSPHRASE);

    try {
        const response = await axios.get(`${BASE_URL}${endPointPath}`, {
            headers: headers
        });
        
        console.log("SUCCESS: Sub-account access verified.");
        console.log("Account Info:", response.data);
    } catch (error) {
        console.error("VERIFICATION FAILED: ", error.response ? error.response.data : error.message);
    }
};

verifySubAccountAccess();
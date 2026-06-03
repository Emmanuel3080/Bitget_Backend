const crypto = require('crypto');

const dotnev = require("dotenv")
dotnev.config()

/**
 * Generates Bitget API authentication headers
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} requestPath - The API path (e.g., /api/spot/v1/trade/order)
 * @param {object} body - The request body (for POST/PUT)
 * @param {string} apiKey - Your API Key
 * @param {string} secretKey - Your Secret Key
 * @param {string} passphrase - Your API Passphrase
 */
const getBitgetHeaders = (method, requestPath, body, apiKey, secretKey, passphrase) => {
    const timestamp = Date.now().toString();
    const bodyString = body ? JSON.stringify(body) : '';

    // The sign string format: timestamp + method + requestPath + body
    const signString = timestamp + method.toUpperCase() + requestPath + bodyString;
                                                 
    // Generate HMAC-SHA256 signature
    const signature = crypto.createHmac('sha256', secretKey).update(signString).digest('base64');

    return {
        'ACCESS-KEY': apiKey,
        'ACCESS-SIGN': signature,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-PASSPHRASE': passphrase,
        'Content-Type': 'application/json',
    };
}
       
module.exports = { 
    getBitgetHeaders       
 };                      




                    



                                       
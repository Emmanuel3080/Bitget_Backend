const crypto = require("crypto")
const getBitgetHeaders = (method, requestPath, body, apiKey, secretKey, passphrase) => {
    const timestamp = Date.now().toString();
    // Ensure body is a JSON string without extra spaces if possible
    const bodyString = body ? JSON.stringify(body) : '';

    // Standard Bitget signature format: timestamp + method + path + body
    // Ensure no extra spaces between these components
    const signString = `${timestamp}${method.toUpperCase()}${requestPath}${bodyString}`;

    const signature = crypto.createHmac('sha256', secretKey)
        .update(signString)
        .digest('base64');

    return {
        'ACCESS-KEY': apiKey,
        'ACCESS-SIGN': signature,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-PASSPHRASE': passphrase,
        'Content-Type': 'application/json',
    };
}

module.exports = { getBitgetHeaders }
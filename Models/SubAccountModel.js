const mongoose = require('mongoose');

const subAccountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subAccountId: { type: String, required: true, unique: true }, // From Bitget API
    label: { type: String },
    status: { type: String, default: 'active' },
    apiKeyId: { type: String }, // To link future API keys
    createdAt: { type: Date, default: Date.now }
});

const subAccountModel = mongoose.model('SubAccount', subAccountSchema);
module.exports = subAccountModel
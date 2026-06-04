

const express = require("express");
const createSubAccount = require("../Services/CreateSubAccount");


const accountRouter = express.Router()





accountRouter.post("/create-subaccount", async (req, res) => {
    const { email, label } = req.body;

    if (!email || !label) {
        return res.status(400).json({ success: false, message: "Email and label are required" });
    }

    const result = await createSubAccount(email, label);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
});






module.exports = accountRouter


const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path : path.resolve(__dirname, "../.env")})



const connectDatabase = async () => {
    const mongoDbUrl = process.env.MongoDbKey
    console.log("Connecting to Database..");

    try {
        const connect = await mongoose.connect(mongoDbUrl)
        if (connect) {
            console.log("MongoDb Connected Successfully✅👩🏾‍💻👍🏾");
        }

    } catch (error) {
        console.log(error);

    }

}

module.exports = connectDatabase
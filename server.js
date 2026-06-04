

const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const handleError = require("./Handlerror/handleError")
const connectDatabase = require("./CONFIG_DB/connectDb")
const accountRouter = require("./Routes/AccountRoutes")
dotenv.config()


const port = process.env.portNumber

const app = express()

app.use(cors())
app.use(express.json())


app.listen(port, () => {
    console.log(`Port Running at http://localhost:${port}`);
})


app.get("/", (req, res) => {
    res.send("Bitget is Active")
})


connectDatabase()


app.use("/api/v2/broker/account", accountRouter)

app.use("/{*any}", handleError)

app.all("/{*any}", (req, res) => {
    res.status(500).json({
        Message: `${req.method} ${req.originalUrl} is not a vaild endpoint on this server`,
    });
})
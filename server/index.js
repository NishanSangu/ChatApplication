const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express()
require("dotenv").config();

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("Connected to mongodb");
}).catch((err) => {
    console.error(err.stack)
    process.exit(1)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Chat Server started on ${process.env.PORT}`)
})
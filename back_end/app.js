const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); //.env를 쓸 수 있도록 해준다.
const cors = require("cors");
const app = express();
app.use(cors());

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to db"));

module.exports = app;
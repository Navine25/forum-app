// const dotenv = require("dotenv")
require('dotenv').config()
const express = require("express")
const app = express()
const routes = require('../routes/routes')
const port = 3000
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({ extended: false }));
// app.use(flash())
app.use("/", routes)

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    app.listen(port, () => {
        console.log("Server are Running in port ", port);
    })
}).catch((err) => {
    console.log(err);
})
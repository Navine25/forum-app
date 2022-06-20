// const dotenv = require("dotenv")
require('dotenv').config()
const express = require("express")
const app = express()
const routes = require('../routes/routes')
const port = 3000
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


app.set("view engine", "ejs")
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));
app.use("/", routes)

mongoose.connect(process.env.DB_CONNECTION, () => {
    app.listen(port, () => {
        console.log("Server are Running in port ", port);
    })
})
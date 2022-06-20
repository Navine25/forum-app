const express = require("express")
const dotenv = require("dotenv")
const app = express()
const routes = require('../routes/routes')
const port = 3000
const bodyParser = require("body-parser")
app.set("view engine", "ejs")
app.use(express.static('public'))

// app.use(express.bodyParser())
app.use(express.urlencoded({ extended: true }));
app.use("/", routes)

app.listen(port, () => {
    console.log("Server are Running in port ", port);
})
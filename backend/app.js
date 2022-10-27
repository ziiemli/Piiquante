//import express
const express = require("express")
const app = express()
//import dotenv to use environment variables
const dotenv = require("dotenv").config()

//access to the request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//import mongoose
const mongoose = require("mongoose")
//access server path
const path = require("path")
//import Routes
const userRoutes = require("./routes/user")
const sauceRoutes = require("./routes/sauce")

//mongoose
mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"))

//allow software to access API
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    next()
})

//save routes
app.use("/api/auth", userRoutes)
app.use("/api/sauces", sauceRoutes)
app.use("/images", express.static(path.join(__dirname, "images")))

//export to call from node server
module.exports = app

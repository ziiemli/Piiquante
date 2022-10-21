//import express
const express = require("express")
const formData = require("express-form-data")
//import
const app = express()

//access to the request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(multer({
//   dest: './uploads/'
// }))

//import mongoose
const mongoose = require("mongoose")
//access server path
const path = require("path")
//import userRoutes
const userRoutes = require("./routes/user")
//import sauceRoutes
const sauceRoutes = require("./routes/sauce")

//mongoose
mongoose
    .connect("mongodb+srv://ziiemli:ZiieMongoDB@cluster0.t5eaalb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
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

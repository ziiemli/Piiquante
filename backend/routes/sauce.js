//import express
const express = require("express")
//create router
const router = express.Router()

//import multer
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

//import controller
const sauceCtrl = require("../controllers/sauce")

//actions
router.get("/", auth, sauceCtrl.getAllSauces)
router.post("/", auth, multer, sauceCtrl.createSauce)
router.get("/:id", auth, sauceCtrl.getOneSauce)
router.put("/:id", auth, multer, sauceCtrl.modifySauce)
router.delete("/:id", auth, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, sauceCtrl.likeSauce)

//export router
module.exports = router

//import express
const express = require('express')

//create router
const router = express.Router()

//import controller
const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

//export router
module.exports = router;
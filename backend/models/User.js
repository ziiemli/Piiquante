//import Mongoose
const mongoose = require('mongoose')
//import information validation package
const uniqueValidator = require('mongoose-unique-validator')

//create user schema
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//apply validator to schema
userSchema.plugin(uniqueValidator)

//export model format
module.exports = mongoose.model('User', userSchema)
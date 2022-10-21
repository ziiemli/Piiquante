//import bcrypt
const bcrypt = require('bcrypt')
//import token package
const jwt = require('jsonwebtoken')
//import User
const User = require('../models/User')

//save users
exports.signup = (req, res, next) => {
    //hash password
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //create new user
        const user = new User({
            email: req.body.email,
            password: hash
        })
        //save the new user
        user.save()
            .then( () => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};

//connect existing users
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        //if user doesn't exist
        if(user === null) {
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
        }
        //user exists
        else {
            //compare to check if it's the correct password
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                //invalid error authentification
                if(!valid) {
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
                }
                //correct authentification
                else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            //data to encoded
                            {userId: user._id},
                            //key for encoding
                            'RANDOM_TOKEN_SECRET',
                            //configuration element
                            {expiresIn: '24h'}
                        )
                    })
                }
            })
            .catch(error => {
                res.status(500).json({error})
            })
        }
    })
    .catch(error => {
        res.status(500).json({error})
    })
}
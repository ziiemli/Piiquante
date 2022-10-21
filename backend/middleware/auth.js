//import jwt
const jwt = require("jsonwebtoken")

//export
module.exports = (req, res, next) => {
    try {
        //recover token
        const token = req.headers.authorization.split(" ")[1]
        //decode the token
        const decodeToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
        //recover userId
        const userId = decodeToken.userId
        req.auth = {
            userId: userId,
        }

        next()
    } catch (error) {
        //error
        res.status(401).json({error})
    }
}

//import 
const multer = require("multer")
const path = require("node:path")

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
}

//save incoming files
const storage = multer.diskStorage({
    //destination > images file
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname, "../images"))
    },
    //explain filename
    filename: (req, file, callback) => {
        //use orinal name and replace spaces by _
        const name = file.originalname.split(" ").join("_")
        //manage extension
        const extension = MIME_TYPES[file.mimetype]
        //filename
        callback(null, name + Date.now() + "." + extension)
    },
})

//export configured multer
module.exports = multer({storage}).single("image")

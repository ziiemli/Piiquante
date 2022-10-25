//import
const Sauce = require("../models/Sauce")
const fs = require("fs")

//createSauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    delete sauceObject._userId
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    })
    sauce
        .save()
        .then(() => res.status(201).json({message: "Objet enregistré !"}))
        .catch((error) => res.status(400).json({error}))
}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
    //if req.fil exists 
        ? {
            //recover object
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          }
          //if req.fil doesn't exist 
        : {...req.body}
    //prevents changing the userId
    delete sauceObject._userId
    //recover the post
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            //the user doesn't match 
            if (sauce.userId != req.auth.userId) {
                res.staus(401).json({message: "Non-autorisé"})
            //it's the good user
            } else {
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: "Objet modifié !"}))
                    .catch((error) => res.status(401).json({error}))
            }
        })
        .catch((error) => res.status(400).json({error}))
}

//deleteSauce
exports.deleteSauce = (req, res, next) => {
    //recover the post
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            //the user doesn't match 
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Non-autorisé'})
            //it's the good user
            } else {
                //recover the image name
                const filename = sauce.imageUrl.split('/images/')[1]
                //delete the image
                fs.unlink(`/images/${filename}`,() => {
                    //delete the post
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({error}))
                })

            }
        })
        .catch((error) => res.status(404).json({error}))
}

//getOneSauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({error}))
}

//getAllSauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({error}))
}

//like sauce
exports.likeSauce = (req, res, next) => {
    console.log(req.body.userId);
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
            console.log(sauce);
            //if user likes
            if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}})
                    .then(() => res.status(200).json({message: 'like +1'}))
                    .catch((error) => res.status(400).json({error}))
            //if user dislikes
            } else if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne({_id: req.params.id}, {$inc: {disLikes: 1}, $push: {usersDisliked: req.body.userId}})
                    .then(() => res.status(200).json({message: 'dislike +1'}))
                    .catch((error) => res.status(400).json({error}))
            } else {
                //if user removes his like
                if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                    Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
                        .then(() => res.status(200).json({message: 'like -1'}))
                        .catch((error) => res.status(400).json({error}))
                //if user removes his dislike
                } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                    Sauce.updateOne({_id: req.params.id}, {$inc: {disLikes: -1}, $pull: {usersDisliked: req.body.userId}})
                        .then(() => res.status(200).json({message: 'dislike -1'}))
                        .catch((error) => res.status(400).json({error}))
                }
            }
        })
        .catch((error) => res.status(404).json({error}))

}
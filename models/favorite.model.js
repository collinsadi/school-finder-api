const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const favoriteSchema = new Schema({

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"finder"
    },
    school:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"school"
    },

}, { timestamps: true })


const Favorite = mongoose.model("favorite", favoriteSchema)

module.exports = Favorite
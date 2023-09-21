const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const finderSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    token: {
        type: String
    },
    validated: {
        type: Boolean,
        default:false
    },
    validationCode: {
        type: String
    },
    validationExpires: {
        type: String
    },

}, { timestamps: true })


const Finder = mongoose.model("finder", finderSchema)


module.exports = Finder
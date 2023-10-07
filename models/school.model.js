const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schoolSchema = new Schema({

    name: {
        type: String,
        required:true
    },
    type: {
        type: String
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    website: {
        type: String,
        required:true
    },
    registrationDocs: {
        type: String,
        required:true
    },
    fees: {
        type: String
    },
    location: {
        type: String
    },
    entranceDate: {
        type: String
    },
    logo: {
        type: String
    },
    motto: {
        type: String
    },
    admissionStatus: {
        type: Boolean
    },
    blocked: {
        type: Boolean
    },
    validated: {
        type: Boolean,
        default:false
    },
    verified: {
        type: Boolean
    },
    token: {
        type: String
    },
    validationCode: {
        type: String
    },
    validationExpires: {
        type: String
    },
    method: {
        type: String
    },
    scholarship: {
        type: String
    },

}, { timestamps: true })


const School = mongoose.model("school", schoolSchema)

module.exports = School
const express = require("express")
const router = express.Router()

const { finderSignUp,verifyFinderEmail } = require("../controllers/finderControllers/finder.controller")


router.post("/finder/signup",finderSignUp)
router.post("/finder/signup/verify",verifyFinderEmail)







module.exports = router
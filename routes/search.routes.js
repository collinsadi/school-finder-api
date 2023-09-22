const express = require("express")
const router = express.Router()

const { searchSchool } = require("../controllers/search/search.controller")

router.get("/search",searchSchool)


module.exports = router
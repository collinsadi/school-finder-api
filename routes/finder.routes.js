const express = require("express")
const router = express.Router()

const { finderSignUp,verifyFinderEmail,loginFinder } = require("../controllers/finderControllers/finder.controller")
const {newFavorite,removeFavorite,getFinderFavorites} = require("../controllers/finderControllers/finderFavorite.controller")

const finderAuth = require("../middlewares/finder/finderAuthMiddleWare")

router.post("/finder/signup",finderSignUp)
router.post("/finder/signup/verify",verifyFinderEmail)
router.post("/finder/login",loginFinder)

router.post("/finder/favorite/new",finderAuth,newFavorite)
router.post("/finder/favorite/remove",finderAuth,removeFavorite)
router.post("/finder/favorite/get",finderAuth,getFinderFavorites)





module.exports = router
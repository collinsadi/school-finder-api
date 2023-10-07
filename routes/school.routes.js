const express = require("express")
const router = express.Router()

const {schoolSignUp, verifySchool, loginSchool,allSchools,oneSchool } = require("../controllers/schoolControllers/school.controller")

const {editAdmission,editFees,editContactDetails} = require("../controllers/schoolControllers/editSchool.controller")

const schoolAuth = require("../middlewares/school/schoolAuthMiddleWare")


router.post("/school/signup",schoolSignUp)
router.post("/school/signup/verify",verifySchool)
router.post("/school/login",loginSchool)

router.post("/school/edit/admission",schoolAuth,editAdmission)
router.post("/school/edit/fees",schoolAuth,editFees)
router.post("/school/edit/contact",schoolAuth,editContactDetails)
router.get("/schools/get",allSchools)
router.get("/schools/one",oneSchool)



module.exports = router
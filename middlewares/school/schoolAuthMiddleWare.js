const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtsecret = process.env.JWT_VENDOR


const schoolAuth = (request, response,next) => {

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {

        const token = request.headers.authorization.split(" ")[1]

        try{

            const decoded = jwt.verify(token, jwtsecret)
            const school = decoded.school
            request.school = school._id
            console.log(school)
            
            next()

        }catch(error){

            response.status(401).json({status:false, message:"Unauthorized Request"})
            console.log(error)
        }
        

    } else {
        
        response.status(401).json({status:false, message:"Unauthorized Request"})
    }




}


module.exports = schoolAuth
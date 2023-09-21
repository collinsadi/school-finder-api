const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../config/sendEmail")
const Finder = require("../../models/finder.model")
const ejs = require("ejs")
const path = require("path")
require("dotenv").config()
const jwtsecret = process.env.JWT_FINDER



const finderSignUp = async (request, response) => {
    
    const {firstName,lastName,email,password} = request.body

    try {
    
       if(!firstName){

        return response.status(422).json({ status: false, message: "First Name is Required" })
           
       }
       if(!lastName){

        return response.status(422).json({ status: false, message: "Last Name is Required" })
           
       }
       if(!email){

        return response.status(422).json({ status: false, message: "Email is Required" })
           
       }
       if(email.indexOf("@") === -1){

        return response.status(422).json({ status: false, message: "Email a Valid Email" })
           
       }
       if(!password){

        return response.status(422).json({ status: false, message: "Password is Required" })
           
       }
       if(password.length < 6){

        return response.status(422).json({ status: false, message: "Password must be 6 Characters and More" })
           
       }

       const finderExists = await Finder.findOne({email})

        if (finderExists) {
          
            return response.status(401).json({status:false, message:"Email Already In Use"})
            
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationCode = ("" + Math.random()).substring(2, 8)
        const validationExpires = new Date();

        const finder = await Finder.create({firstName,lastName,email,password:hashedPassword,validationCode:verificationCode,validationExpires})

        const data = {

            verificationCode
        }

        const templatePath = path.join(__dirname,"..","..", "views", "confirmEmail.ejs")

        ejs.renderFile(templatePath, data, (err, html) => {
            
            if (err) {
                console.log("Error Rendering Ejs Template:", err)
                
                 response.status(400).json({status:false, message:"A Fatal Error Occured On Our End, Please Dont Panic"})

                return;
                
            } else {
                sendEmail(email,"Email Verification",html)
            }

        })


        response.status(201).json({status:true, message:"Account Created Please Verify Your Email",email})





    } catch (error) {
        
        console.log(error)
        response.status(500).json({status:false, message:"Internal Server Error"})
    }

}

const verifyFinderEmail = async (request, response) => {
    
    const { email, code } = request.body
    
    try{

        if (!email) {
            
            return response.status(422).json({status:false, message:"Email is Required" })
        }

        if(!code){

            return response.status(422).json({status:false, message:"Validation Code Missing"})
        }

        const finder = await Finder.findOne({ email })
        
        if(!finder){

            return response.status(401).json({status:false, message:"an Error Occured"})
        }

        
        if (code !== finder.validationCode) {
            
            return response.status(401).json({status:false, message:"Invalid Validation Code"})
        }

        const currentDate = new Date()
        const sentDate = new Date(finder.validationExpires)
        const minutesAgo = currentDate.getMinutes() - sentDate.getMinutes()

        console.log(minutesAgo)
        console.log(sentDate)


        if (minutesAgo > 20) {


            // If the code has Expired Resend a New One to the User


        const verificationCode = ("" + Math.random()).substring(2, 8)

            finder.validationCode = verificationCode
            finder.validationExpires = new Date()

            await finder.save()
            
        const data = {

            verificationCode
        }

        const templatePath = path.join(__dirname,"..","..", "views", "confirmEmail.ejs")

        ejs.renderFile(templatePath, data, (err, html) => {
            
            if (err) {
                console.log("Error Rendering Ejs Template:", err)
                
                response.status(400).json({ status: false, message: "A Fatal Error Occured On Our End, Please Dont Panic" })

                return;
                
            } else {
                sendEmail(email,"Email Verification",html)
            }

        })


            response.status(401).json({ status: false, message: "Verification Code Expired, a New Code Has Been Sent" })
            
            return;
        }


        finder.validationCode = undefined
        finder.validationExpires = undefined
        finder.validated = true
        const token = jwt.sign({ finder }, jwtsecret) 
        finder.token = token
        await finder.save()

        const updatedFinder = await Finder.findOne({ email })
        
        response.status(201).json({status:true, message:"Email Verified Successfully",finder:updatedFinder})




    }catch(error){

        console.log(error)
        response.status(500).json({status:false, message:"Internal Server Error"})
    }

}








module.exports = {

    finderSignUp,
    verifyFinderEmail
}

const School = require("../../models/school.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../config/sendEmail")
const ejs = require("ejs")
const path = require("path")
require("dotenv").config()
const jwtsecret = process.env.JWT_FINDER


const schoolSignUp = async (request, response) => {
    
    const {name,email,phone,password,website,registrationDocs} = request.body

    try {
        
        if (!name) {
            
            return response.status(422).json({status:false, message:"School Name is Required"})
        }

        if (!email) {
            
            return response.status(422).json({status:false, message:"School Email is Required"})
        }

        if (!phone) {
            
            return response.status(422).json({status:false, message:"School Phone Number Required"})
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

        if(!website){

            return response.status(422).json({status:false, message:"School Website Required"})
        }

        if(!registrationDocs){

            return response.status(422).json({status:false, message:"School Registration Document Required"})
        }
        
        const schoolWebsiteExists = await School.findOne({ website })
        
        if (schoolWebsiteExists) {
            
            return response.status(401).json({status:false, message:"This Website is already Verified With another School"})
        }

        const schoolExists = await School.findOne({ email })
        
        if (schoolExists) {
            
            return response.status(401).json({status:false, message:"Email Already Registered with Another School"})
        }



        const hashedPassword = await bcrypt.hash(password, 10)
     

        const school = await School.create({name,email,phone,password:hashedPassword,website,registrationDocs})

    
        
        school.validated = true
        const token = jwt.sign({ school }, jwtsecret)
        school.token = token

        await school.save()

        const updatedSchool = await School.findOne({email})

        response.status(201).json({status:true, message:"School Registration Sucessful,",school:updatedSchool})


    } catch (error) {
        
        console.log(error)
        response.status(500).json({status:false, message:"internal Server Error"})
    }

}

const verifySchool = async (request, response) => {
    
    const { email, code } = request.body

    try{

        if (!email) {
            
            return response.status(422).json({status:false, message:"an Error Occured Try Loging In again",issue:"Email Could Not Be Found and this is a Developer Error"})
        }

        if(!code){
            
            return response.status(422).json({status:false, message:"Verification Code Missing"})
        }

        const school = await School.findOne({ email })
        
        if (!school) {
            
            return response.status(422).json({status:false, message:"an Error Occured Try Loging In again"})
        }

        if(code !== school.validationCode){

            return response.status(401).json({status:false, message:"Invalid Verification Code"})
        }


        const currentDate = new Date()
        const sentDate = new Date(school.validationExpires)
        const minutesAgo = currentDate.getMinutes() - sentDate.getMinutes()

        console.log(minutesAgo)
        console.log(sentDate)


        if (minutesAgo > 20) {


            // If the code has Expired Resend a New One to the User


        const verificationCode = ("" + Math.random()).substring(2, 8)

            school.validationCode = verificationCode
            school.validationExpires = new Date()

            await school.save()
            
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


        school.validationCode = undefined
        school.validationExpires = undefined
        school.validated = true
        const token = jwt.sign({ school }, jwtsecret)
        school.token = token

        await school.save()

        const updatedSchool = await School.findOne({email})

        response.status(201).json({status:true, message:"Account Verified Successfully",school:updatedSchool})

    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }
}

const loginSchool = async (request, response) => {
    
    const { email, password } = request.body
    
    try{

        if (!email) {
            
            return response.status(422).json({status:false, message:"School Email is Required"})
        }
        
        if(!password){

        return response.status(422).json({ status: false, message: "Password is Required" })
           
        }

        const school = await School.findOne({ email })
        
        if (!school) {
            

            return response.status(401).json({status:false, message:"Invalid Credentials"})
        }

        const passwordIsValid = await bcrypt.compare(password, school.password)
        
        if (!passwordIsValid) {
        
         return response.status(401).json({status:false, message:"Invalid Credentials"})

        }

        if(!school.validated){

            const verificationCode = ("" + Math.random()).substring(2, 8)
            const validationExpires = new Date();

            school.validationCode = verificationCode
            school.validationExpires = validationExpires

            await school.save()

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




            return response.status(401).json({status:false, message:"Please Your Verify Email",email})


        }

        response.status(200).json({status:true, message:"Login Sucessful",school})

    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }

}



const allSchools = async (request, response)=>{

    try{

    const schools = await School.find().sort({craeatedAt:-1})


    response.status(200).json({status:true, schools})
    }catch(error){

        console.log(error)
    }


}


const oneSchool = async (request, response)=>{

    const id = request.query.id

    try{

    const school = await School.findById(id)

    response.status(200).json({status:true, school})

    }catch(error){

        console.log(error)
    }

}


module.exports = {

    schoolSignUp,
    verifySchool,
    loginSchool,
    allSchools,
    oneSchool
}
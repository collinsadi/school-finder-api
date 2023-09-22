const School = require("../../models/school.model")


const editAdmission = async (request, response)=>{

    const { admissionStatus, starting, ending } = request.body
    const id = request.school
    
    try {
        
        if (admissionStatus && !starting) {
        
            return response.status(422).json({status:false, message:"Specify a Starting Date for Admission or Turn off Admission Status"})
        }

        if (admissionStatus && !ending) {
        
            return response.status(422).json({status:false, message:"Specify an Ending Date for Admission or Turn off Admission Status"})
        }


        const school = await School.findById(id)

        if(!school){


            return response.status(401).json({status:false, message:"Bad Gateway, Account Not Found"})
        }

        school.admissionStatus = admissionStatus
        school.entranceDate = `${starting}`
        await school.save()

        response.status(201).json({status:true, message:"Admission Status Updated"})



    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }

}

const editFees = async (request, response)=>{

    const { fee, method, scholarship } = request.body
    const id = request.school
    
    try{

        if (!fee) {
        
        return response.status(422).json({status:false, message:"School Fee is Required"})
        }
        

        const school = await School.findById(id)

        school.fees = fee

        await school.save()

        response.status(200).json({status:true, message:"Fees Status Updated"})


    } catch (error) {
        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }
}

const editContactDetails = async (request, response) => {
    
    const { website, address, phone, email } = request.body
    const id = request.school
    
    try {
    
        if(!website){


            return response.status(422).json({status:false, message:"School Website is Required"})
        }

        if(!address){

            return response.status(422).json({status:false, message:"School Address is Required"})
        }

        if(!phone){

            return response.status(422).json({status:false, message:"School Phone Number Required"})
        }

        if (!email) {
            
            return response.status(422).json({status:false, message:"School Email is Required"})
        }

        const schoolExists = await School.findOne({ email })
        
        if (schoolExists && schoolExists._id != id) {
            
            return response.status(401).json({status:false, message:"Email is already in use"})

        }


        const school = await School.findByIdAndUpdate(id, { website, address, phone, email })
        
        console.log(school)

        response.status(200).json({status:true, message:"Contact Details Updated"})


    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }
}

module.exports = {editAdmission,editFees,editContactDetails}
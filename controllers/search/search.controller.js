const School = require("../../models/school.model")




const searchSchool = async (request, response) => {
    
    const where  = request.query.where
    const keyword = request.query.keyword

    console.log(`Search for ${keyword} in ${where}`)


    try{

    if(!where){

        return response.status(422).json({status:false, message:"Please Specify Where to Search, (eg, Location)"})
    }

    if(!keyword){

        return response.status(422).json({status:false, message:"Please Enter a Search Key Word"})
    }
   


    if(where === "location"){

        const query = keyword ? { $or: [{ location: { $regex: keyword, $options: "i" } }] } : {}
        
        const schools = await School.find(query).sort({ createdAt: -1 })
        
        return response.status(200).json({status:true, message:`${schools.length} Schools found for ${keyword}`,schools})

        }

        
        if (where === "name") {

             const query = keyword ? { $or: [{ name: { $regex: keyword, $options: "i" } }] } : {}
        
        const schools = await School.find(query).sort({ createdAt: -1 })
        
        return response.status(200).json({status:true, message:`${schools.length} Schools found for ${keyword}`,schools})
            
        }

        response.status(422).json({status:false, message:"The Server Could Not Understand Your Input"})


    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }


}


module.exports = {searchSchool}
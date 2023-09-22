const Favorite = require("../../models/favorite.model")



const newFavorite = async (request, response) => {
    
    const { schoolId } = request.body
    const finder = request.finder
    
    try{

        if (!schoolId) {
            
            return response.status(422).json({status:false, message:"School Id Missing"})
        }

        const favoriteExists = await Favorite.findOne({ school: schoolId })
        
        if (favoriteExists) {
            
            return response.status(400).json({status:false, message:"School already in Your Favorites"})
        }

        const favorite = await Favorite.create({ owner: finder, school: schoolId })
        
        response.status(201).json({ status: false, message: "School Added to Favorite" })
        


    } catch (error) {
        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }

}

const removeFavorite = async (request, response) => {
    
    const { schoolId } = request.body
    const finder = request.finder

    try {
        
    if (!schoolId) {
            
         return response.status(422).json({status:false, message:"School Id Missing"})
    }

        const deleteFavorite = await Favorite.findOneAndDelete({ school: schoolId, $and: [{ owner: { $eq: finder } }] })
        
        console.log(deleteFavorite)

        response.status(200).json({status:true, message:"School Removed From Favorite"})


    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }

}

const getFinderFavorites = async (request, response) => {
    
    const owner = request.finder


    try{

        const favorites = await Favorite.find({ owner }).sort({ createdAt: -1 }).populate("school","-token")
        
        
        response.status(200).json({ status: true, favorites })
        

    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }
}


module.exports = {newFavorite,removeFavorite,getFinderFavorites}
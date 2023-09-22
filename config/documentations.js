
// const userRoute = require('../documentation/Users.doc')
const finderRoute = require("../docs/finder.doc")
const schoolRoute = require("../docs/school.doc")
const searchRoute = require("../docs/search.doc")



const swaggerDocumentations = {

    openapi: "3.0.0",
    info: {

        title : "School Finder",
      version: "1.0.0",
      description: "API Documentation for School Finder Web App"
    },
    servers: [

        {
            url: "http://localhost:5000",
            description: "Local Server"
        },
  
    ],
    tags: [

      {  
        name: "Finder",
        description: "School Finder Routes"
    },
      {  
        name: "School",
        description: "Routes for Creating and Managing Schools"
    },
      {  
        name: "Favorite",
        description: "Routes for Managing Finder's Favorites"
    },
      {  
        name: "Search",
        description: "Routes for Searching for Products"
    },


    ],
    paths: {

      ...finderRoute,
      ...schoolRoute,
      ...searchRoute
  
    }

};




module.exports = swaggerDocumentations
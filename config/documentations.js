
// const userRoute = require('../documentation/Users.doc')
const finderRoute = require("../docs/finder.doc")



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
    }


    ],
    paths: {

         ...finderRoute,
  
    }

};




module.exports = swaggerDocumentations
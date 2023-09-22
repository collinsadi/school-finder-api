const searchSchool = {

    tags: ["Search"],
    summary:"Seacrh for School",
    description: "Api Endpoint for Searching for School",
    parameters: [
        {
            name: "where",
            in: "query",
            required: "true",
            description:"where  to search (eg, Location)"
        },
        {
            name: "keyword",
            in: "query",
            required: "true",
            description:"Search Keyword"
        },
    ],
    responses: {
       
        500:{
            description: "Server Side Error",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "an Error Occured on the Server Side"
                        }
                    }
                }
            }
        }
    }
}



const searchRoute = {

    
    "/v1/search": {

        get: searchSchool,
    },
}

module.exports = searchRoute
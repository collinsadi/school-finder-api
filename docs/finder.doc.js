const createFinder = {

    tags: ["Finder"],
    summary:"Finder Sign Up",
    description: "Api Endpoint for Creating New Finder",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        firstName: {
                            type: "string",
                            description: "Finder's First Name",
                            required: true,
                            example:"promise"
                        },
                        lastName: {
                            type: "string",
                            description: "Finder's Last Name",
                            required: true,
                            exmple:"promise"
                        },
                        email: {
                            type: "string",
                            description: "Finder's Email",
                            required: true,
                            unique: true,
                            example:"promise@gmail.com"
                        },
                        password: {
                            type: "string",
                            description: "Finder's Password",
                            required: true,
                        }
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Sign Up Sucessful",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:"success",
                            message: "Sign Up Sucessful"
                        }
                    }
                }
            }
        },
        422:{
            description: "Email  in Use or Required Field Missing",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "Unable to sign Up User"
                        }
                    }
                }
            }
        },
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

const verifyFinder = {

    tags: ["Finder"],
    summary:"Finder Email Verification",
    description: "Api Endpoint for Verifying Finders Email",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "Finder's Email",
                            required: true,
                            example:"promise@gmail.com"
                        },
                        code: {
                            type: "string",
                            description: "Code Sent to Email",
                            required: true,
                            example:"123456"
                        }
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Sign Up Sucessful",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "Email Verified Successfully"
                        }
                    }
                }
            }
        },
        422:{
            description: "Account not Found",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:false,
                            message: "an Error Occured"
                        }
                    }
                }
            }
        },
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

const loginFinder = {

    tags: ["Finder"],
    summary:"Finder Login",
    description: "Api Endpoint for Logging a School Finder in",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "Finder's Email",
                            required: true,
                            example:"promise@gmail.com"
                        },
                        password: {
                            type: "string",
                            description: "Finder's Password",
                            required: true,
                            example:"123456"
                        }
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Returns the User Data",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "Login Sucessful"
                        }
                    }
                }
            }
        },
        422:{
            description: "Required Field Missing",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:false,
                            message: "Email or Password Missing"
                        }
                    }
                }
            }
        },
        500:{
            description: "Server Side Error",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "Internal Server Error"
                        }
                    }
                }
            }
        }
    }
}

const newFavorite = {

    tags: ["Favorite"],
    summary:"Add school to Favorite",
    description: "Api Endpoint for adding a School to Favorite",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        schoolId: {
                            type: "string",
                            description: "Finder's First Name",
                            required: true,
                            example:"123454"
                        }
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Sucessful Action",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "School Added to Favorite"
                        }
                    }
                }
            }
        },
        400:{
            description: "School Exists in User's ",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "School already in Favorite"
                        }
                    }
                }
            }
        },
        500:{
            description: "Server Side Error",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "Internal Server Error"
                        }
                    }
                }
            }
        }
    }
}

const removeFavorite = {

    tags: ["Favorite"],
    summary:"Remove School From Favorite",
    description: "Api Endpoint for removing a School from user's Favorite",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        schoolId: {
                            type: "string",
                            description: "Id of School to Remove",
                            required: true,
                            example:"123454"
                        }
                    }
                }
            }
        }

    },
    responses: {
        200:{
            description: "Sucessful Action",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "School Removed from Favorite"
                        }
                    }
                }
            }
        },
        422:{
            description: "Required Field Missing",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "School Id is missing"
                        }
                    }
                }
            }
        },
        500:{
            description: "Server Side Error",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            message: "Internal Server Error"
                        }
                    }
                }
            }
        }
    }
}

const allFavorites = {

    tags: ["Favorite"],
    summary:"Get Finder's Favorite",
    description: "Api Endpoint for Getting Favorites Belonging to the Logged In User",
   
    responses: {
      
    }
}







const finderRoute = {

    
    "/v1/finder/signup":  {

        post: createFinder,
    },
    
    "/v1/finder/signup/verify":  {

        post:verifyFinder,
    },
    "/v1/finder/login":  {

        post:loginFinder,
    },
    "/v1/finder/favorite/new":  {

        post:newFavorite,
    },
    "/v1/finder/favorite/remove":  {

        post:removeFavorite,
    },
    "/v1/finder/favorite/get":  {

        post:allFavorites,
    },


}

module.exports = finderRoute
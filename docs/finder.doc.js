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















const finderRoute = {

    
    "/v1/finder/signup":  {

        post: createFinder,
    },
    
    "/v1/finder/signup/verify":  {

        post:verifyFinder,
    },


}

module.exports = finderRoute
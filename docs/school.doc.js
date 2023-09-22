const createSchool = {

    tags: ["School"],
    summary:"School Sign Up",
    description: "Api Endpoint for Creating New School",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        name: {
                            type: "string",
                            description: "Name of School",
                            required: true,
                            example:"Timi Group Schools"
                        },
                        email: {
                            type: "string",
                            description: "School Email",
                            required: true,
                            exmple:"hello@timigroupschools.com"
                        },
                        phone: {
                            type: "string",
                            description: "School Mobile Number",
                            required: true,
                            unique: true,
                            example:"+234 9068 149238"
                        },
                        password: {
                            type: "string",
                            description: "School's Password",
                            required: true,
                            example:"password12345"
                        },
                        website: {
                            type: "string",
                            description: "School Website",
                            required: true,
                            example:"www.timigroupschool.com"
                        },
                        registrationDocs: {
                            type: "string",
                            description: "School Registration Docs",
                            required: true,
                            example:"https://drive.google.com/...."
                        },
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

const verifySchool = {

    tags: ["School"],
    summary:"School Email Verification",
    description: "Api Endpoint for Verifying School Email",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "School's Email",
                            required: true,
                            example:"hello@timigroupschools.com"
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

const loginSchool = {

    tags: ["School"],
    summary:"School Login",
    description: "Api Endpoint for Logging a  School in",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        email: {
                            type: "string",
                            description: "School's Email",
                            required: true,
                            example:"hello@timigroupschools.com"
                        },
                        password: {
                            type: "string",
                            description: "School's Password",
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
            description: "Returns the School Data",
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

const editAdmission = {

    tags: ["School"],
    summary:"Edit School Admission",
    description: "Api Endpoint for Editing a School Admission Status",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        admissionStatus: {
                            type: "boolean",
                            description: "School's Admission Status",
                            required: true,
                            example:true
                        },
                        starting: {
                            type: "string",
                            description: "School's Admission Starting Date",
                            example:"25-09-2023"
                        },
                        ending: {
                            type: "string",
                            description: "School's Admission Ending Date",
                            example:"25-10-2023"
                        },
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Successful Action",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "Admission Status Updated"
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
                            message: "Specify a Starting Date for Admission or Turn off Admission Status"
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

const editFees = {

    tags: ["School"],
    summary:"Edit School Fee",
    description: "Api Endpoint for Editing a School Fee Status",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        fee: {
                            type: "string",
                            description: "School's Fee",
                            example:"300000"
                        },
                        method: {
                            type: "string",
                            description: "School's Payment Method",
                            example:"transfer"
                        },
                        scholarship: {
                            type: "string",
                            description: "School's Scholarship Info",
                        },
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Successful Action",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "Fees Status Updated"
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
                            message: "School Fees is Required"
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

const editContact = {

    tags: ["School"],
    summary:"Edit School Contact Information",
    description: "Api Endpoint for Editing a School Contact Informations",
    requestBody: {

        content: {
            "Application/Json":{
                schema:{
                    type: "object",
                    properties:{
                        website: {
                            type: "string",
                            description: "School's Website",
                            example:"www.timischools.com"
                        },
                        address: {
                            type: "string",
                            description: "School's Address",
                            example:"port harcourt, Nigeria"
                        },
                        phone: {
                            type: "string",
                            description: "0814444444444",
                        },
                        email: {
                            type: "string",
                            description: "admin@test.com",
                        },
                    }
                }
            }
        }

    },
    responses: {
        201:{
            description: "Successful Action",
            content: {
                "application/json":{
                    schema: {
                        type: "object",
                        example: {
                            status:true,
                            message: "Contact Details Updated"
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












const schoolRoute = {

    
    "/v1/school/signup":  {

        post: createSchool,
    },
    
    "/v1/school/signup/verify":  {

        post:verifySchool,
    },
    "/v1/school/login":  {

        post:loginSchool,
    },
    "/v1/school/edit/admission":  {

        post:editAdmission,
    },
    "/v1/school/edit/fees":  {

        post:editFees,
    },
    "/v1/school/edit/contact":  {

        post:editContact,
    },


}

module.exports = schoolRoute
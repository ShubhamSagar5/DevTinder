const validator = require('validator')



const validateSignupData = (req) => {
    const {firstName,lastName,email,password,age,gender} = req.body


    if(!firstName || !lastName || !email || !password || !age || !gender){
        throw new Error("Error : All Fields Required")
    }
    if(!validator.isEmail(email)){
        throw new Error("Error : Provide Valid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Error : Password is weak")
    }
}


const validateLoginData = (req) => {

    const {email,password} = req.body

    if(!email || !password){
        throw new Error("Error : Email and Password Required !!")
    }

}

const validateEditProfileData = (req) => {
    
    const data = req.body

    const allowedTypes = ["firstName","lastName","age","gender","photoUrl","about","skills"] 

    const isAllowedTypesValid = Object.keys(data).every((field)=>allowedTypes.includes(field)) 

    return isAllowedTypesValid

}

const validateEditPassword = (req) => {

    const {newPassword} = req.body 

    if(!validator.isStrongPassword(newPassword)){
        throw new Error("Please Provide Strong Password Which Contain At Least One--[Alphabet,Number,Character,Special Character]")
    }

}

module.exports = {
    validateSignupData,
    validateLoginData,
    validateEditProfileData,
    validateEditPassword
}

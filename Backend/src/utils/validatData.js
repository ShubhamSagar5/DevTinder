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

module.exports = {
    validateSignupData,
    validateLoginData
}

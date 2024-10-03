const jwt = require('jsonwebtoken')
const { User } = require('../models/User')

const adminAuth = (req,res,next) => {

    const token = "xyzz" 

    if(token !== "xyzz"){
        return res.status(500).json({
            success:false,
            message:"Admin Token Not Match"
        })
    }else{
        console.log("Authentiacte")
        next()
    }
 
}


const userAuth = async(req,res,next) => {
    try {
        
        const {token} = req.cookies

        if(!token){
            throw new Error("Token is invalid !!")
        }

        const decode = await jwt.verify(token,'DevTinder@123')

        const user = await User.findById(decode._id)

        if(!user){
            throw new Error("User Not Found")
        }

        req.user = user 

        next()


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong during auth",
            errorMessage:error.message
    
        })
    }
}

module.exports = {
    adminAuth,
    userAuth
}
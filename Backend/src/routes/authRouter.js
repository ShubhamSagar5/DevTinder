const express = require('express')
const { validateSignupData, validateLoginData } = require('../utils/validatData')
const bcrypt = require('bcrypt')
const { User } = require('../models/User')

const authRouter = express.Router()


authRouter.post("/signUp",async(req,res)=>{

    try {
   
           const {firstName,lastName,email,password,age,gender} = req.body
   
           validateSignupData(req)
           
           const hashPassword = await bcrypt.hash(password,10) 
   
           const user = new User({
               firstName:firstName,
               lastName:lastName,
               email:email,
               password:hashPassword,
               age:age,
               gender:gender
           })
   
          await user.save()
   
          return res.status(200).json({
           success:true,
           message:"Sign Up Successfully",
           data:user
          })
   
   
    } catch (error) {
       return res.status(500).json({
           success:false,
           message:"Something went wrong during singup",
           errorMessage:error.message
   
       })
    }
   
})

authRouter.post("/login",async(req,res)=>{
    try {
        
        const {email,password} = req.body 

        validateLoginData(req)

        const user = await User.findOne({email:email})

        if(!user){
            throw new Error("Error : Invalid Credentials Email Not Found Please Sign Up")
        }

        const isPasswordIsValid = await user.validatePassword(password)

        if(isPasswordIsValid){

            const token = await user.getJWT()

            
            res.cookie("token",token,{expires:new Date(Date.now() + 8 * 3600000),httpOnly:true})
             res.send(`${user.firstName} Login successfully`)
       
        }else{
            throw new Error("Error : Invalid Credentials Password Not Match")

        }


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong during login",
            errorMessage:error.message
    
        })
    }
})

authRouter.post("/logout",(req,res)=>{
    try {
        
        res.clearCookie("token")

        res.status(200).json({
            success:true,
            message:"Logout Successfully"
        })

    } catch (error) {
        
    }
})

module.exports = authRouter
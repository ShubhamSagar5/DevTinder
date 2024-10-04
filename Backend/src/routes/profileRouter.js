const express = require('express')
const { userAuth } = require('../middleware/auth')
const { User } = require('../models/User')
const { validateEditProfileData, validateEditPassword } = require('../utils/validatData')
const bcrypt = require('bcrypt')

const profileRouter  = express.Router() 


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try {
   
        
        const user = req.user 

        res.status(200).json({
            success:true,
            message:"Profile of User",
            data:user
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try {
        
       const validation =  validateEditProfileData(req)
        if(!validation){
            throw new Error("You Only Able To Update Follwing Fields -- [firstName,lastName,age,gender,photoUrl,about,skills]")
        }

        const userWantUpdateFields = req.body

        const loggedInUser = req.user 

        Object.keys(userWantUpdateFields).forEach((key)=> (loggedInUser[key] = userWantUpdateFields[key]))

        await loggedInUser.save() 

        res.status(200).json({
            success:true,
            message:`${loggedInUser.firstName} Successfully Update Profile`
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }
})


profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user 

        const {oldPassword,newPassword} = req.body 

        validateEditPassword(req) 

        const compareOldPasswordWithNewPassword = await loggedInUser.validatePassword(oldPassword) 

        console.log(compareOldPasswordWithNewPassword)

        if(compareOldPasswordWithNewPassword){

            const hashNewPassword = await bcrypt.hash(newPassword,10) 

            loggedInUser.password = hashNewPassword 

            await loggedInUser.save() 

            res.send("Password Update Successfull")

        }else{
            throw new Error("Old Password Credentials Invalid")
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })   
    }
})


module.exports = profileRouter
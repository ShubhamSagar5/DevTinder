const express = require('express')
const { userAuth } = require('../middleware/auth')
const { ConnectionRequestModel } = require('../models/ConnectionRequest')

const userRouter = express.Router() 


userRouter.get("/user/request/recived",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user 

        const connectionRequest = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])

        return res.status(200).json({
            success:true,
            message:"All Request",
            data : connectionRequest
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


module.exports = userRouter
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

userRouter.get("/user/connection/list",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user

        const USE_SAFE_DATA = "firstName lastName age gender photoUrl about skills"

        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser, status:"accepted"}
            ]
        }).populate("fromUserId",USE_SAFE_DATA)
        .populate("toUserId",USE_SAFE_DATA)

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId.equals(loggedInUser._id)){
                return row.toUserId
            }else{
                return row.fromUserId
            }
        })

        return res.status(200).json({
            message:"Connection List",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

module.exports = userRouter
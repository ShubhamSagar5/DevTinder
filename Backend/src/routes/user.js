const express = require('express')
const { userAuth } = require('../middleware/auth')
const { ConnectionRequestModel } = require('../models/ConnectionRequest')
const { User } = require('../models/User')

const userRouter = express.Router() 

const USE_SAFE_DATA = "firstName lastName age gender photoUrl about skills"
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


userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user 

        const page = parseInt(req.query.page) || 1 
        let limit = parseInt(req.query.limit) || 10 

        limit = limit > 50 ? 50 : limit

        const skip = (page-1) * limit

        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        })

        const hideUserFromFeed = new Set() 

        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        })

        const user = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USE_SAFE_DATA).skip(skip).limit(limit)




        return res.status(200).json({
            success:true,
            data:user
        })


    } catch (error) {
        
    }
})


module.exports = userRouter
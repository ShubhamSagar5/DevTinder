const express  = require('express')
const { userAuth } = require('../middleware/auth')
const { User } = require('../models/User')
const { ConnectionRequestModel } = require('../models/ConnectionRequest')

const connectionRouter = express.Router() 

connectionRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try {
        
        const fromUserId = req.user._id 
        const toUserId = req.params.toUserId
        const status = req.params.status 

        const allowedTypesForstatus = ["ignore","interested"]

        const isAllowedTypesfForStatus = allowedTypesForstatus.includes(status)

        if(!isAllowedTypesfForStatus){
            return res.status(400).json({
                message:"Status Type is Not Allowed"
            })
        }

           //try to write this logic in model
        // if(fromUserId == toUserId){
        //     return res.status(400).json({
        //         message:"You Cannnot Send Request to You "
        //     })
        // }

        const existingConnection = await ConnectionRequestModel.find({
            $or:[
                {
                    fromUserId:fromUserId,
                    toUserId:toUserId
                },
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId
                }
            ]
        })

        if(existingConnection){
            return res.status(400).json({
                success:false,
                message:"You Already Send Connection Request"
            })
        }

        const toUserIdIsAvailable = await User.findById(toUserId)

        if(!toUserIdIsAvailable){
            return res.status(400).json({
                message:"to User is not Exits"
            })
        }

        const requestHandler =  new ConnectionRequestModel({
            fromUserId:fromUserId,
            toUserId:toUserId,
            status:status
        })

       const data =  await requestHandler.save()

        return res.status(200).json({
            success:true,
            data,
            message:`${req.user.firstName} is ${status} ${toUserIdIsAvailable.firstName} Successfully!!`
        })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

connectionRouter.post("/request/acceptOrReject/:status/:requestId",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user 

        const {status,requestId} = req.params 

        const allowedTypes = ["accepted","rejected"]

        const isAllwedTypesValid = allowedTypes.includes(status)

        if(!isAllwedTypesValid){
            return res.status(400).json({
                message:"Status Type Not Allowed"
            })
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })

        if(!connectionRequest){
            return res.status(404).json({
                message:"Connection Not Found"
            })
        }

         connectionRequest.status = status

         await connectionRequest.save()

         return res.status(200).json({
            success:true,
            message:` You ${status} the Request `
         })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

module.exports = connectionRouter
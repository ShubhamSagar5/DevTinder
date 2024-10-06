const mongoose = require('mongoose')


const connectionRequestSchema = new mongoose.Schema({
 fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        requied:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is Incorrected Status Type`
        }
    }
},{
    timestamps:true
})

connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this 

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('Cannot Send Connection Request to Yourself')
    }
    next()
})

const ConnectionRequestModel  = mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = {
    ConnectionRequestModel
}
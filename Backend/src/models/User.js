const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        lowercase:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
        maxLength:10
    },
    age:{
        type:Number,
        required:true,
        trim:true,
        min:18

    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","Female","others"].includes(value)){
                throw new Error("Provide Valid Gender from male,female,others")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3jIVWlH-B_YLL3UnQCN2AHr819XZJFTXB-w&s"
    },
    about:{
        type:String,
        default:"This is default Text for about field"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})


const User = mongoose.model("User",userSchema)

module.exports = {
    User
}
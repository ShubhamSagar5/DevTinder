const mongoose = require("mongoose")
const validator = require('validator')

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
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Provide valid Email : "+value)
            }
        }

    },
    password:{
        type:String,
        required:true,
        trim:true,
        // minLength:8,
        // maxLength:10
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Provide valid Password ")
            }
        }
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
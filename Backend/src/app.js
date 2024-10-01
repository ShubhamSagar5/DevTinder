const express = require('express')
const connectionDB = require("./utils/database")
const { User } = require('./models/User')

const app = express() 



app.post("/signUp",async(req,res)=>{

 try {
       const data = {
           firstName:"Hari",
           lastName:"Hari",
           email:"Hari@123",
           password:"pass@122",
   
       }
   
       const user = new User(data)

       await user.save()

       return res.status(200).json({
        success:true,
        message:"Sign Up Successfully"
       })


 } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Something went wrong during singup",
        errorMessage:error.message

    })
 }

})



connectionDB()
.then(()=>{
    console.log("Database Connection Successfully Established..")
    app.listen(7777,(req,res)=>{
        console.log("Server is successfully listening on port No 7777")
    })
})
.catch((err)=>{
    console.log("Database cannot be connected")
})


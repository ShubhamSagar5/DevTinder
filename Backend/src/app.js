const express = require('express')
const connectionDB = require("./config/database")
const { User } = require('./models/User')
const { validateSignupData, validateLoginData } = require('./utils/validatData')

const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const { userAuth } = require('./middleware/auth')


const app = express() 

app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/authRouter")
const profileRouter = require("./routes/profileRouter") 
const connectionRouter = require("./routes/connectionRequest")
const userRouter = require('./routes/user')

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",connectionRouter)
app.use("/",userRouter)


// app.get("/users",async (req,res)=>{
//     try {

//         const users = await User.find({})

//         if(users.length === 0){
//             return res.send("Database is empty")
//         }else{
//             return res.send(users)
//         }
        
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong during fetchibg all user",
//             errorMessage:error.message
    
//         })
//     }
// })

// app.get("/user",async(req,res)=>{
//     try {
        

//         const userId = req.body.userId 
//         console.log(userId)

//         const user = await User.findById({_id:userId})
//         console.log(user)
//         if(!user){
//              res.send("No Entry is found with this id")
//         }else{
//             res.send(user)
//         }

//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong during fetchibg all user",
//             errorMessage:error.message
    
//         })
//     }
// })


// app.get("/userEmail",async(req,res)=>{
//     try {
        

//         const email = req.body.email 
//         console.log(email)

//         const user = await User.findOne({email:email})
//         console.log(user)
//         if(!user){
//              res.send("No Entry is found with this id")
//         }else{
//             res.send(user)
//         }

//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong during fetchibg all user",
//             errorMessage:error.message
    
//         })
//     }
// })


// app.patch("/update/:userId",async(req,res)=>{
//     try {
        
//         const data = req.body
//         const userId = req.params.userId

//         const allowedTypes = ["firstName","lastName","password","age","gender","skills"]

//         const isUpdate = Object.keys(data).every((k)=>allowedTypes.includes(k)) 

//         console.log(isUpdate)

//         if(!isUpdate){
//             throw new Error("You can not update email")
//         }

//         if(data.skills.length > 5){
//             throw new Error("You Ca only add 5 Skills ")
//         }

//         const user = await User.findByIdAndUpdate(userId,data,{returnDocument:"after"})

//         res.send(user)
        

//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong during fetchibg all user",
//             errorMessage:error.message
    
//         })
//     }
// }) 


// app.delete("/delete",async(req,res)=>{

//     try {
        
//         const userId = req.body.Id 

//         const user = await User.findByIdAndDelete({_id:userId})

//         res.send(user)


//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong during fetchibg all user",
//             errorMessage:error.message
    
//         })
//     }

// })

// app.get("/profile",userAuth,async (req,res)=>{
//     try {
        
//        const user = req.user


//         res.send(user)
       

//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong during login",
//             errorMessage:error.message
    
//         })
//     }
// })

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


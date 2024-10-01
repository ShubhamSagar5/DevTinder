const express = require('express')


const app = express() 


const {adminAuth,userAuth} = require("./middleware/auth")

// app.use("/admin",adminAuth)
app.get("/admin/data",adminAuth,(req,res)=>{
    
    throw new Error("this is error")

    console.log("Data is send")
    res.send("Send data")
})


app.delete("/admin/data",(req,res)=>{
    console.log("data is delete")
    res.send("delete data")
})

app.use("/user",userAuth)
app.get("/user/data",(req,res)=>{
    console.log("Data is send")
    res.send("Send data")
})


app.delete("/user/data",(req,res)=>{
    console.log("Data is send")
    res.send("delete data")
})





// app.post("/test",(req,res,next)=>{
//     console.log("First Req Handler")
//     res.send("end")
// },(req,res,next)=>{
//     console.log("Second Req handler")
//     next()
//     res.send("end")

// },(req,res,next)=>{
//     console.log("third req handler")
    
// })


app.use("/",(err,req,res,next)=>{
    res.send("Wild Route")
    if(err){
        console.log(err)
    }
    
})




app.listen(7777,()=>{
    console.log("Server is listening on Port No 7777")
})
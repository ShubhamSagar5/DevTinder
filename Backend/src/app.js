const express = require('express')


const app = express() 


app.use("/test",(req,res)=>{
    res.send("Hello From Test World")
})

app.use("/car",(req,res)=>{
    res.send("Hello From Car World")
})

app.use("/animal",(req,res)=>{
    res.send("Hello from the animal ")
})

app.listen(7777,()=>{
    console.log("Server is listening on Port No 7777")
})
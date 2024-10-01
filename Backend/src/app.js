const express = require('express')


const app = express() 


app.get("/test/:id",(req,res)=>{
    console.log(req.params)

})

app.get("/man",(req,res)=>{
    console.log(req.query)
    res.send("Hello From Test World")
})

app.get("/test*c",(req,res)=>{
    res.send("Hello From Test World")
})

app.use("/car",(req,res)=>{
    res.send("Hello From Car World")
})

app.use("/animal",(req,res)=>{
    res.send("Hello from the animal ")
})


app.use("/",(req,res)=>{
    res.send("This is Home Path")
})


app.listen(7777,()=>{
    console.log("Server is listening on Port No 7777")
})
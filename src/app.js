const express = require("express");

const app = express();

app.get("/user",(req,res,next)=>{
    //res.send("1st Response")
    next()
});

app.get("/user",(req,res,next)=>{
   // res.send("2nd Response")
    next()
});

app.get("/user",(req,res,next)=>{
    res.send("3rd Response")
    next()
});




app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000...")
});
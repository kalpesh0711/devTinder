const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send("name:kalpesh lastName:choudhary")
});

app.post("/user",(req,res)=>{
    res.send("data uploaded")
});

app.delete("/user",(req,res)=>{
    res.send("data deleted")
});


app.use("/test",(req,res)=>{
    res.send("Welcome to test");
});      



app.use("/run",(req,res)=>{
    res.send("Welcome to run");
});   

// app.use((req,res)=>{
//     res.send("Hello from server singh ji..");   
// });

app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000...")
});
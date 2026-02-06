const express = require("express");

const app = express();

app.use("/admin",(req,res,next)=>{ 
    console.log("Admin auth is getting checked!");
    const token = "xyz";
    const isAdminAuthorized = token ==="xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");   
    } else {
        next();
    }
});

app.get("/admin/getAllData",(req,res)=> {
    res.send("All Data send");  
});

app.get("/admin/deleteData",(req,res)=> {
    res.send("Deleted a user");   
});
 
app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000...")
});
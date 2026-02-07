const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//creating api to put data
app.post("/signup",async (req,res) =>{

    const userObj = {
        firstName:"MS",
        lastName:"Dhoni",
        emailId:"ms@dhoni.com",
        password:"dhoni@123"
    }
    //creating a new instance of User model
    const user= new User(userObj);          //or we can directly add data without creat userobj
    
    try{
        await user.save();
        res.send("User added Successfully");
    } catch (err)  {
        res.status(400).send("Error saving the user:"+err.message);
    }
    
});

connectDB()
  .then(() => {
    console.log("Database connection established...");

    app.listen(3000,()=> {
    console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err)=>{
    console.error("Database can't be connected");
    console.error(err.message); // <-- THIS tells the truth 
  });
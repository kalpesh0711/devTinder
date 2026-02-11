const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//signup API dynamic to recieve data frim end user(postman,chrome,..) 
app.use(express.json());  //middleware activ. for all the routes
 
//creating api to put data
app.post("/signup",async (req,res) =>{
  console.log(req.body);

   
    //creating a new instance of User model
    const user= new User(req.body);          
    
    try{
        await user.save();
        res.send("User added Successfully");
    } catch (err)  {
        res.status(400).send("Error saving the user:"+err.message);
    }
     
});

// GET /feed - get all the user from database
app.get("/feed",async(req,res) => {
   try {
    const user = await User.find({});
    
    res.send(user);
  } 
  catch (error) {
    res.status(400).send("something went wrong")
    
  }      

});

app.get("/user",async(req,res)=> {
  const userEmail = req.body.emailId;          //and whenever u'r doing DB operation alw. use asyc-await bec. they are promise
  
  try {
    const user = await User.find({emailId:userEmail});
    if (user.length===0) {
      res.status(401).send("user not found")
    }
    res.send(user);
  } 
  catch (error) {
    res.status(400).send("something went wrong")
    
  }      
  
  
  
});



// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

app.patch("/user",async(req,res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({_id:userId},data);
  } catch (error) {
    res.status(400).send("Something went wrong ");     
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



  
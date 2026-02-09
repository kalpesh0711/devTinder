const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//signup API dynamic to recieve data frim end user(postman,chrome,..)
app.use(express.json());  //middleware activ. for all the routes
 
//creating api to put data
app.post("/signup",async (req,res) =>{

   
    //creating a new instance of User model
    const user= new User(req.body);          
    
    try{
        await user.save();
        res.send("User added Successfully");
    } catch (err)  {
        res.status(400).send("Error saving the user:"+err.message);
    }
    
});



// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
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
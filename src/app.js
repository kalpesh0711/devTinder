const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const app = express();
app.use(cookieParser());


//signup API dynamic to recieve data frim end user(postman,chrome,..) 
app.use(express.json());  //middleware activ. for all the routes         


app.post("/login",async(req,res) => {
  
  try {
    //extracting email and pass   
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId: emailId});    //left=field name in DB and right=value from req.body
    if (!user) {
      throw new Error("Invalid email credentials");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if (isPasswordValid) {
      // create JWT token

      const token = await jwt.sign({_id:user._id},"Dev@Tinder$790");   //user._id is id from DB
      console.log(token);

     // Add the token to cookie and send the response back to the user
      res.cookie("token",token);   // riht side token of jwt.sign

      res.send("Login Successful!");
    } else { 
      throw new Error("Invalid password credentials");
    }
    
  } catch (err) {
  res.status(400).send(err.message);
}

});

 
//creating api to put data
app.post("/signup",async (req,res) =>{                                             
  try{

  validateSignUpData(req);

  const {firstName ,lastName,emailId,password } = req.body;
  
   
  //Encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);


  console.log(req.body);

   
    //creating a new instance of User model
    const user= new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,

    });          
    
    
        await user.save();
        res.send("User added Successfully");
    } catch (err)  {
        res.status(400).send("Error saving the user:"+err.message);
    }
     
});


app.get("/profile",async(req,res) => { 
  const cookies = req.cookies;
 const {token} = cookies;

 const decodedMessage = await jwt.verify(token,"Dev@Tinder$790");

 console.log(decodedMessage);
 const {_id} = decodedMessage;
 console.log(cookies);
})

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

//to get data from emailId
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


//to update
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







  
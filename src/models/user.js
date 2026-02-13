const mongoose = require("mongoose");
const validator = require("validator");

//see in documentation of how to write schema on mongoose web

//this schema defines the model
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        validate(value){    //created validate func.
        if (!validator.isEmail(value)) {
            throw new Error("Invalid email address:"+value);
        } 
        },
    },
    password: {
        type: String,
    },
    age: {                            
        type: Number,
    },
    gender: {
        type: String,
    },
});

//created mongoose model (start caps whenever refrencing to model)    (see documentation)
const User = mongoose.model("User",userSchema);

module.exports= User;
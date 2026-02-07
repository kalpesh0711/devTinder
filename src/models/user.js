const mongoose = require("mongoose");

//see in documentation of how to write schema on mongoose web

//this schema defines the model
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
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
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First Name is required"],
    },
    lastname:{
        type:String,
        required:[true,"Last Name is required"],
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    }
})


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;



const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
    department:{
        type:String,
        required:[true,"Department is required"],
    },
    speciality:{
        type:String,
        required:[true,"Speciality is required"],
    },
    expertise:{
        type:String,
        required:[true,"Expertise is required"],
    },
    experience:{
        type:String,
        required:[true,"Experience is required"],
    },
    qualification:{
        type:String,
        required:[true,"Qualification is required"],
    },
    chamberTime:{
        type:String,
        required:[true,"Chamber Time is required"],
    },
    offDay:{
        type:String,
        required:[true,"Off Day is required"],
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


const doctorModels = mongoose.model("doctors", doctorSchema);

module.exports = doctorModels;



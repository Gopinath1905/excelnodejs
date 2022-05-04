const string = require("@hapi/joi/lib/types/string");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    UserID:{
        type:String,
        unique:true,
        required:true
    },
    Firstname:{
        type:String,
        required:true
    },
   Lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
   PhNo:{
        type:Number,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    }
});
  

module.exports = mongoose.model('User',userSchema);
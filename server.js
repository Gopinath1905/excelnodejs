const express = require("express");
const mongoose  = require("mongoose");
const router = require('./router/router')

const app = express(); 


app.listen(3500,()=>{
    console.log("Server connected...!");
});

app.use('/', router);
mongoose.connect( "mongodb+srv://authrouters:191005@cluster0.sq2zs.mongodb.net/excel?retryWrites=true&w=majority",
(err) =>{
    if(err) return console.log("error:",err);
    console.log("mongoDB connected...!");
})
require('dotenv').config();
const express = require("express");
const mongoose  = require("mongoose");
const router = require('./router/router')

const app = express(); 


app.listen(3500,()=>{
    console.log("Server connected...!");
});

app.use('/', router);
mongoose.connect(process.env.DB_URI,
(err) =>{
    if(err) return console.log("error:",err);
    console.log("mongoDB connected...!");
})
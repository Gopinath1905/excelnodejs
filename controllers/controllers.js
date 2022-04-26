const {authSchema }= require("../validation/validation");
const express = require("express");
const excel = require("exceljs");
const readxlsxFile = require("read-excel-file/node");
const path = require("path");
const uploadFile= require ("../controllers/multer");
const User = require ("../models/userModels");
const convertToJSON = require("../controllers/exceltojson");

const Joi = require("@hapi/joi");

const app = express();

exports.upload = (req,res) => {
    try{
        
        if (req.file == undefined){
            return res.status(402).send("Excel file is not uploaded")
        }; 
        let path =__dirname +"/xlsxfile/"  + req.file.filename;
        readxlsxFile(path).then(async (values) =>  {
            const data = JSON.stringify(convertToJSON(values));
            console.log(data);
            var myObj = JSON.parse(data)
            const result = await authSchema.validateAsync(myObj.data);
            const options = { new:true }; 
         User.insertMany(myObj,options) 
            .then(() => {
              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",error
              });
            });
        });
      } catch(error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
    } 
}

exports.findAll = (req, res) => {
  User.find({}).sort({_id:-1})
  .then(User => {
      res.send(User);
  }).catch(err => {
      res.status(500).send({
          message: err.message 
      });
  });
};








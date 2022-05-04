const { authSchema }= require("../validation/validation");
const express = require("express");
const excel = require("exceljs");
const readxlsxFile = require("read-excel-file/node");
const path = require("path");
const uploadFile = require ("../controllers/multer");
const User = require ("../models/userModels");
const convertToJSON = require("../controllers/exceltojson");
const Joi = require("@hapi/joi");
const app = express();

exports.upload=(req,res)=>{
  try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path =__dirname+"/xlsxfile/" + req.file.filename;
    readxlsxFile(path).then((values) => {
        const data=JSON.stringify(convertToJSON(values));
        var myObj=JSON.parse(data)       
        const update = myObj;
        const options = { upsert:true }; 
        User.insertMany(update,options) 
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully:" + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: error.message||"Fail to import data into database!"
            });
          });
      });
    }catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file:" + req.file.originalname,
      });
    }
  };
exports.findAll = (req,res) => {
  User.find({}).sort({_id:-1})
  .then(User => {
      res.send(User);
  }).catch(err => {
      res.status(500).send({
          message: err.message 
      });
  });
};








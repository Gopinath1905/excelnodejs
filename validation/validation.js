const Joi = require("@hapi/joi");

 const authSchema = Joi.object({
     UserID:Joi.string().required(),
     Firstname:Joi.string().required(),
     Lastname:Joi.string().required(),
     Email:Joi.string().required(),
     PhNo:Joi.number().max(10).required(),
     City:Joi.string().required(),
     State:Joi.string().required(),
 })

 module.exports = {
     authSchema
 }
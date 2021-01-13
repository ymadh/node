
const mongoose = require('mongoose');
const Joi = require('joi');

//Define a schema
const Customers = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
}));


function validateCustomer(item) {
    const schema = Joi.object({
       name: Joi.string()
           .min(5)
           .max(30)
           .required(),
        phone: Joi.string(),
        isGold: Joi.boolean()
      
    });
    
    return schema.validate(item);
 }
 

 exports.Customers = Customer; 
 exports.validateCustomer = validateCustomer; 
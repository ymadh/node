const mongoose = require('mongoose');
const Joi = require('joi');

const Product = mongoose.model('Product', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      price: {
          type: Number
      },
      imgUrl: {
          type: String
      }
}));

function validate(item) {
    const schema = Joi.object({
       title: Joi.string()
           .min(5)
           .max(30)
           .required(),
        price: Joi.number().required(),
        imgUrl: Joi.string()
    });
    
    return schema.validate(item);
 }

exports.Product = Product; 
exports.validate = validate; 
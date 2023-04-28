const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  qauntity: Joi.number().integer().min(1).required()
});

module.exports = { addProductSchema, salesSchema };
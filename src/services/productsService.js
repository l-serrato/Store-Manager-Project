const productsModel = require('../models/productsModel');
const schema = require('./validations/inputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

const insert = async (product) => {
  const error = schema.validateName(product.name);
  if (error.type) return error;
  const result = await productsModel.insert(product);
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
};
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

const update = async (product, id) => {
  const result = await productsModel.update(product, id);
  return result;
};

const remove = async (id) => {
  const product = await productsModel.remove(id);
  return product;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};
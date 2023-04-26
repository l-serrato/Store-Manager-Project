const productsModel = require('../models/productsModel');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

const insert = async (product) => {
  const result = await productsModel.insert(product);
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
};
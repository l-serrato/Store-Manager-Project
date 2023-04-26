const productsModel = require('../models/productsModel');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  return product;
};

module.exports = {
  findAll,
  findById,
};
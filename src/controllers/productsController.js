const productsService = require('../services/productsService');

const findAll = async (req, res) => {
  const products = await productsService.findAll();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  if (product) {
    return res.status(200).json(product);
  }
    return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  findAll,
  findById,
};
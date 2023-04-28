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

const insert = async (req, res) => {
  const product = req.body;
  const result = await productsService.insert(product);
  if (!product.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (product.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const result = await productsService.update(product, id);
  if (product) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: 'Product not found' });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const [product] = await productsService.remove(id);
  if (product.affectedRows > 0) {
    return res.status(204).json();
  }
  return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};
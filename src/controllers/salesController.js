const salesService = require('../services/salesService');

const findAllSales = async (req, res) => {
  const sales = await salesService.findAllSales();
  return res.status(200).json(sales);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSalesById(id);
  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

/* const insertSales = async (req, res) => {
  const sale = req.body;
  const result = await salesService.insertSales(sale);
  if (!sale.quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (!sale.productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (sale.quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  res.status(201).json(result);
}; */

module.exports = {
  findAllSales,
  findSalesById,
  // insertSales,
};
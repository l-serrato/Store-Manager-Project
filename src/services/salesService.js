const salesModel = require('../models/salesModel');
const schema = require('./validations/inputValues');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  const saleFormat = sales.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  return saleFormat;
};

const findSalesById = async (id) => {
  const sale = await salesModel.findSalesById(id);
  const saleFormat = sale.map((s) => ({
    date: s.date,
    productId: s.product_id,
    quantity: s.quantity,
  }));
  return saleFormat;
};

const insertSales = async (sale) => {
  const error = schema.validateSales(sale.productId);
  if (error.type) return error;
  const result = await salesModel.insertSales(sale);
  return result;
};

module.exports = {
  findAllSales,
  findSalesById,
  insertSales,
};
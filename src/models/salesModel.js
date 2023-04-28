const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection
    .execute(
  'SELECT * FROM sales INNER JOIN sales_products ON sales.id = sales_products.sale_id',
  );
  return sales;
};

const findSalesById = async (id) => {
  const [result] = await connection
  .execute(
  'SELECT * FROM sales INNER JOIN sales_products ON sales.id = sales_products.sale_id WHERE id = ?',
      [id],
    );
  return result;
};

/* const insertSales = async (sale) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUE (?)');

  sale.forEach(({ productId, quantity }) => {
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });
  return { id: insertId, itemsSold: sale };
}; */

module.exports = {
  findAllSales,
  findSalesById,
  // insertSales,
};
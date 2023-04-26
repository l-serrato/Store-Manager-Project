const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
  return products;
};

const findById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const insert = async (product) => {
  const [result] = await connection.execute(`INSERT INTO products (name) VALUES (?)`, [product.name]);
  return { id: result.insertId, name: product.name};
};

module.exports = {
  findAll,
  findById,
  insert,
};
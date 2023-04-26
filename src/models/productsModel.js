const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
  return products;
};

const findById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  findAll,
  findById,
};
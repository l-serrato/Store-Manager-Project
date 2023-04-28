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
  const [result] = await connection
    .execute('INSERT INTO products (name) VALUES (?)', [product.name]);
  return { id: result.insertId, name: product.name };
};

const update = async (product, id) => {
  const result = await connection.execute(
    `UPDATE products 
    SET name = ? WHERE id = ?`,
    [product.name, id],
  );
  return { id: result.id, name: product.name };
};

const remove = async (id) => connection.execute('DELETE FROM products WHERE id = ?', [id]);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};
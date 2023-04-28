const { addProductSchema, salesSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateSales = (productId) => {
  const { error } = salesSchema.validate({ productId });
  if (error) return { type: 'INVALID_VALUE', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = { validateName, validateSales };
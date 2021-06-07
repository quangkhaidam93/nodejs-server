const knex = require('../database/config');

const tableName = 'products';

const getAllProducts = async () => {
  return await knex(tableName).select();
}

const getProduct = async (id) => {
  return await knex(tableName).first().where('id', id);
}

const deleteProduct = async (id) => {
  return await knex(tableName).delete().where('id', id);
}

const createProduct = async (newProduct) => {
  return await knex(tableName).insert(newProduct);
}

const updateProduct = async (updatedProduct, id) => {
  return await knex(tableName).where('id', id).update(updatedProduct);
}

const reduceQuantity = async (number, id) => {
  // return await knex(tableName).where('id', id).update({quantity: knex.raw(`quantity - ${number}`)}); // Cách 1
  return await knex(tableName).where('id', id).decrement('quantity', number); // Cách 2
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  reduceQuantity,
  getProduct,
  deleteProduct
}
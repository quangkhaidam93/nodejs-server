const knex = require('../database/config');

const tableName = 'orders';
const productTable = 'products';
const shippingAddressTable = 'shipping_addresses';

const getAllOrders = async () => {
  return await knex(tableName).select(shippingAddressTable + ".*", shippingAddressTable + ".name as receiver_name", productTable + '.*', tableName + ".*")
    .innerJoin(shippingAddressTable, tableName + '.shipping_address_id', '=', shippingAddressTable + '.id')
    .innerJoin(productTable, tableName + '.product_id', '=', productTable + '.id')
}

const createOrder = async (orderInfo) => {
  return await knex(tableName).insert(orderInfo);
}

module.exports = {
  getAllOrders,
  createOrder
}
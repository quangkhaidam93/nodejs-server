
exports.up = function(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.integer('product_id').unsigned();
    table.foreign('product_id').references('products.id');
    table.integer('shipping_address_id').unsigned();
    table.foreign('shipping_address_id').references('shipping_addresses.id');
    table.enu('payment', ['momo', 'cod', 'zalopay', 'atm']).notNullable().defaultTo('momo');
    table.enu('promotion',['freeship', 'discount']);
    table.enu('discount_type',['direct', 'percentage']);
    table.integer('discount_number');
    table.float('total');
    table.float('grand_total');
    table.float('shipping_fee');
    table.datetime('updated_at').default(knex.fn.now());
    table.datetime('created_at').default(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders');
};

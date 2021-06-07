
exports.up = function(knex) {
  return knex.schema.table('orders', table => {
    table.enu('status', ['payment_waiting', 'processing', 'on_shipping', 'delivered', 'cancled']).defaultTo('payment_waiting');
  })
};

exports.down = function(knex) {
  return knex.schema.table('orders', table => {
    table.dropColumn('status');
  })
};


exports.up = function(knex) {
  return knex.schema.alterTable('orders', function(table) {
    table.enu('status', ['payment_waiting', 'processing', 'on_shipping', 'delivered', 'canceled', 'done']).defaultTo('payment_waiting').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('orders', function(table) {
    table.enu('status', ['payment_waiting', 'processing', 'on_shipping', 'delivered', 'cancled']).defaultTo('payment_waiting').alter();
  });
};

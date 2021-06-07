
exports.up = function(knex) {
  return knex.schema.createTable('shipping_addresses', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('street').notNullable();
    table.string('phone').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('shipping_addresses')
};

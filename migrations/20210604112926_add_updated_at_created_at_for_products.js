
exports.up = function(knex) {
  return knex.schema.table('products', table => {
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.datetime('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.table('products', table => {
    table.dropColumn('updated_at');
    table.dropColumn('created_at');
  })
};

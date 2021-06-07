
exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('sku');
    table.float('price');
    table.string('image_url');
    table.string('name');
    table.float('selling_price');
    table.text('short_desc');
    table.text('detail_desc');
    table.bigInteger('quantity');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products')
};

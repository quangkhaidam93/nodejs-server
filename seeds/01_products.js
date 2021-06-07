
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, sku: '00001', price: 15000, name: 'San pham 1', selling_price: 10000, short_desc: 'abc...', detail_desc: 'xyz...', quantity: 10},
        {id: 2, sku: '00001', price: 16000, name: 'San pham 2', selling_price: 12000, short_desc: 'abc...', detail_desc: 'xyz...', quantity: 20},
        {id: 3, sku: '00001', price: 17000, name: 'San pham 3', selling_price: 14000, short_desc: 'abc...', detail_desc: 'xyz...', quantity: 5},
      ]);
    });
};

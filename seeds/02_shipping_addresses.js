
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('shipping_addresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('shipping_addresses').insert([
        {id: 1, name: 'DQK', email: 'dqk@gmail.com', street: 'CMT8 Q10 TP.HCM', phone: '0123456789'},
        {id: 2, name: 'KKK', email: 'kkk@gmail.com', street: 'Trường Chinh Q Tân Bình TP.HCM', phone: '0123456789'}
      ]);
    });
};

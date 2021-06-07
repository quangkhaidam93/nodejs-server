const knex_config = require('../../../knexfile');

var knex = require('knex')(knex_config.development);

module.exports = knex;

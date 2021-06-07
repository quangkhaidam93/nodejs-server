// Update with your config settings.
require('dotenv').config('.env');
const convertSnakeToCamel = require('./src/services/convertSnakeToCamel');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    },
    postProcessResponse: (result, queryContext) => {
      if (Array.isArray(result)) {
        return result.map(row => {
          if (!!row) 
            Object.keys(row).forEach(key => {
              if (key.includes('_')) {
                row[convertSnakeToCamel(key)] = row[key];
                delete row[key];
              }
            })
          return row;
        });
      } else {
        if (result)
          Object.keys(result).forEach(key => {
            if (key.includes('_')) {
              result[convertSnakeToCamel(key)] = result[key];
              delete result[key];
            }
          })
        return result;
      }
    },
    migrations: {
      directory: 'migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

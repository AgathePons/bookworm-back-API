const debug = require('debug')('SQL:log');
const { Pool } = require('pg');

const config = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(config);

module.exports = {
  originalClient: pool,
  async query(...params) {
    debug(...params);
    return this.originalClient.query(...params);
  },
};

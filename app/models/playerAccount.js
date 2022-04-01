const debug = require('debug')('model:player_account');
const client = require('../config/db');

const playerAccountDataMapper = {
  async findOne(id) {
    debug(`findOne called for id ${id}`);
    const result = await client.query('SELECT username, mail FROM player WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = playerAccountDataMapper;

const debug = require('debug')('model:sentence');
const client = require('../config/db');

/**
 * @typedef {object} Sentence - 1 sentence
 * @property {number} id - pk of the table
 * @property {string} title - title of the sentence
 * @property {string} text - text of the sentence
 */

const sentenceDataMapper = {
  async findAll() {
    debug('findAll called');
    const result = await client.query('SELECT * FROM sentences');
    return result.rows;
  },
  async findOne(id) {
    debug(`findOne called for id ${id}`);
    const result = await client.query('SELECT * FROM sentences WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = sentenceDataMapper;

const debug = require('debug')('model:object2');
const client = require('../config/db');

/**
 * @typedef {object} Object2 - Object 2
 * @property {number} id - pk of the table
 * @property {string} label - column label of the table
 * @property {string} text_content - column text_content of the table
 */

/**
 * @typedef {object} Object2Input - input to send a req.body to insert or update object2
 * @property {string} label - column label of the table
 * @property {string} text_content - column text_content of the table
 */

const object2DataMapper = {
  async findAll() {
    debug('findAll called');
    const result = await client.query('SELECT * FROM object2');
    return result.rows;
  },
  async findByPk(object2Id) {
    debug(`findByPk called for id ${object2Id}`);
    const result = await client.query('SELECT * FROM object2 WHERE id = $1', [object2Id]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
  async insert(object2) {
    debug('insert called');
    const insertedObject2 = await client.query(
      `
      INSERT INTO object2 (label, text_content) VALUES
      ($1, $2) RETURNING *
      `,
      [object2.label, object2.text_content],
    );
    return insertedObject2.rows[0];
  },
  async update(object2Id, object2) {
    debug(`update called for id ${object2Id}`);
    const fields = Object.keys(object2).map((prop, index) => `"${prop}" = $${index + 1}`);
    debug('fields:', fields);
    const values = Object.values(object2);
    debug('values:', values);
    const updatedObject2 = await client.query(
      `
      UPDATE object2 SET ${fields}
      WHERE id = $${fields.length + 1}
      RETURNING *
      `,
      [...values, object2Id],
    );
    return updatedObject2.rows[0];
  },
  async delete(object2Id) {
    debug(`delete called for id ${object2Id}`);
    const result = await client.query('DELETE FROM object2 WHERE id = $1', [object2Id]);
    return !!result.rowCount;
  },
  async isUnique(inputData, object2Id) {
    debug('check unique fields');
    const fields = [];
    const values = [];
    Object.entries(inputData).forEach(([key, value], index) => {
      if (['label', 'text_content'].includes(key)) {
        fields.push((`"${key}" = $${index + 1}`));
        values.push(value);
      }
    });
    if (fields.length === 0 && values.length === 0) {
      return null;
    }
    const preparedQuery = {
      text: `SELECT FROM object2 WHERE (${fields.join(' OR ')})`,
      values,
    };
    // if object2Id is provided (in update case) we have to complete the preparedQuery
    // to ignore this object2
    if (object2Id) {
      preparedQuery.text += ` AND id <> $${values.length + 1}`;
      preparedQuery.values.push(object2Id);
    }
    const result = await client.query(preparedQuery);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = object2DataMapper;

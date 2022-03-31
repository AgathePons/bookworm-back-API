const debug = require('debug')('model:object1');
const client = require('../config/db');

/**
 * @typedef {object} Object1 - Object 1
 * @property {number} id - pk of the table
 * @property {string} title - column title of the table
 * @property {string} content - column content of the table
 * @property {number} object2_id - fk refers to object2
 */

/**
 * @typedef {object} Object1Input - input to send a req.body to insert or update object1
 * @property {string} title - column title of the table
 * @property {string} content - column content of the table
 * @property {number} object2_id - fk refers to object2
 */

const object1DataMapper = {
  async findAll() {
    debug('findAll called');
    const result = await client.query('SELECT * FROM object1');
    return result.rows;
  },
  async findByPk(object1Id) {
    debug(`findByPk called for id ${object1Id}`);
    const result = await client.query('SELECT * FROM object1 WHERE id = $1', [object1Id]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
  async insert(object1) {
    debug('insert called');
    const insertedObject1 = await client.query(
      `
      INSERT INTO object1 (title, content, object2_id) VALUES
      ($1, $2, $3) RETURNING *
      `,
      [object1.title, object1.content, object1.object2_id],
    );
    return insertedObject1.rows[0];
  },
  async update(object1Id, object1) {
    debug(`update called for id ${object1Id}`);
    const fields = Object.keys(object1).map((prop, index) => `"${prop}" = $${index + 1}`);
    debug('fields:', fields);
    const values = Object.values(object1);
    debug('values:', values);
    const updatedObject1 = await client.query(
      `
      UPDATE object1 SET ${fields}
      WHERE id = $${fields.length + 1}
      RETURNING *
      `,
      [...values, object1Id],
    );
    return updatedObject1.rows[0];
  },
  async delete(object1Id) {
    debug(`delete called for id ${object1Id}`);
    const result = await client.query('DELETE FROM object1 WHERE id = $1', [object1Id]);
    return !!result.rowCount;
  },
  async isUnique(inputData, object1Id) {
    debug('check unique fields');
    const fields = [];
    const values = [];
    Object.entries(inputData).forEach(([key, value], index) => {
      if (['title', 'content'].includes(key)) {
        fields.push((`"${key}" = $${index + 1}`));
        values.push(value);
      }
    });
    if (fields.length === 0 && values.length === 0) {
      return null;
    }
    const preparedQuery = {
      text: `SELECT FROM object1 WHERE (${fields.join(' OR ')})`,
      values,
    };
    // if object1Id is provided (in update case) we have to complete the preparedQuery
    // to ignore this object1
    if (object1Id) {
      preparedQuery.text += ` AND id <> $${values.length + 1}`;
      preparedQuery.values.push(object1Id);
    }
    const result = await client.query(preparedQuery);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = object1DataMapper;

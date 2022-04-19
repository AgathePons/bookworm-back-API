/* eslint-disable max-len */
const debug = require('debug')('model:player_account');
const client = require('../config/db');
const ApiError = require('../errors/apiError');

/**
 * @typedef {object} PlayerAccount - player account
 * @property {string} username - Your nickname must be between 3 and 15 letters or numbers.
 * @property {string} mail - mail of the player
 * @property {string} password - Your password must contain a capital letter, a number and a character other than " for a total of ten characters.
 */

/**
 * @typedef {object} playerInput -  to send a req.body
 * @property {string} username - Your nickname must be between 3 and 15 letters or numbers.
 * @property {string} mail - mail of the player
 * @property {string} password - Your password must contain a capital letter, a number and a character other than " for a total of ten characters.
 * @property {string} passwordConfirm - The confirmPassword must be the same as the password.
 */

/**
 * @typedef {object} playerUpdate -  to send a req.body
 * @property {string} username - Your nickname must be between 3 and 15 letters or numbers.
 * @property {string} mail - mail of the player
 */

/**
 * @typedef {object} playerLogin -  to send a req.body
 * @property {string} mail - mail of the player
 * @property {string} password - Your password must contain a capital letter, a number and a character other than " for a total of ten characters.
 */

const playerAccountDataMapper = {

  async findOne(id) {
    debug(`findOne called for id ${id}`);
    const result = await client.query('SELECT username, mail, password FROM player WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
  async insert(userAccount) {
    debug('create called');
    const query = {
      text: 'INSERT INTO player(username, mail, password) VALUES ($1, $2, $3) RETURNING id, username;',
      values: [userAccount.username, userAccount.mail, userAccount.password],
    };
    const newUserAccount = (await client.query(query)).rows[0];
    if (!newUserAccount) {
      throw new ApiError('create user account fails', { statusCode: 500 });
    }
    return newUserAccount;
  },
  async update(playerId, playerAccount) {
    debug('update playerAccount where id is ', playerAccount.id);

    const props = Object.keys(playerAccount);
    const fields = props.map((prop, index) => `"${prop}" = $${index + 1}`);
    const values = Object.values(playerAccount);

    const query = `UPDATE player SET ${fields} WHERE id = $${fields.length + 1} RETURNING username, mail;`;
    const result = await client.query(query, [...values, playerId]);

    return result.rows[0];
  },
  async findByUsername(username) {
    debug(`findByUsername called for user ${username}`);
    const result = await client.query('SELECT username FROM player WHERE username = $1', [username]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
  async findByMail(mail) {
    debug(`findByMail called for mail ${mail}`);
    const result = await client.query('SELECT * FROM player WHERE mail = $1', [mail]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },
  async delete(id) {
    debug('delete playerAccount where id is ', id);
    const result = await client.query('DELETE FROM player_owns_generator WHERE player_id = $1', [id]);
    const result2 = await client.query(' DELETE FROM player WHERE id = $1 ', [id]);

    return !!result.rowCount && result2.rowCount;
  },
  async updateLogoutTime(id) {
    debug('updateLogoutTime ', id);
    const result = await client.query('UPDATE player SET logout_time = CURRENT_TIMESTAMP WHERE  player.id = $1', [id]);

    return !!result.rowCount;
  },
  async updateLoginTime(id) {
    debug('updateLoginTime ', id);
    const result = await client.query('UPDATE player SET login_time = CURRENT_TIMESTAMP WHERE  player.id = $1', [id]);

    return !!result.rowCount;
  },

  async countAfkSc(id) {
    debug(`countAfkCurrency called for id ${id}`);
    const result = await client.query(`SELECT round(extract ('epoch' from login_time - logout_time))  as  timepersecond
    FROM player
    WHERE player.id = $1;`, [id]);
    return result.rows[0];
  },
  async addNewCurrency(newCurrency, id) {
    debug(`add ${newCurrency} to currency where id = ${id}`);
    const result = await client.query('UPDATE player SET currency = $1 WHERE player.id = $2', [newCurrency, id]);
    return result.rows[0];
  },
};

module.exports = playerAccountDataMapper;

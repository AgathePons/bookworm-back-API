const debug = require('debug')('model:player_save');
const client = require('../config/db');
const ApiError = require('../errors/apiError');

// TODO JSDOC schemas

const playerAccountDataMapper = {
  /**
   * getOneUserJson
   * @param {number} id player id
   * @returns {object} json object with data from player table
   */
  async getOneUserJson(id) {
    debug(`getOneUserJson called for id ${id}`);
    const query = {
      text: 'select row_to_json(player.*) as player from player where id=$1;',
      values: [id],
    };
    const player = (await client.query(query)).rows[0];
    return player;
  },
  /**
   * getGeneratorsOwned
   * @param {number} id player id
   * @returns {[object]} json array of objects with data from generator table,
   * with only generators owned by the player
   */
  async getGeneratorsOwned(id) {
    debug(`getGeneratorsOwned called for id ${id}`);
    const query = {
      text: `SELECT  json_agg(generator.*) as generators
        FROM player_owns_generator
        JOIN player ON player_owns_generator.player_id=player.id
        JOIN generator ON player_owns_generator.generator_id=generator.id
        WHERE player_owns_generator.player_id=$1
        GROUP BY player;`,
      values: [id],
    };
    const generatorsOwned = (await client.query(query)).rows[0];
    return generatorsOwned;
  },
  /**
   * getPlayerNotOwnsGenerator
   * @param {number} id player id
   * @returns {[object]} json array of objects with data from generator table,
   * with only generators NOT owned by the player
   */
  async getPlayerNotOwnsGenerator(id) {
    debug(`getPlayerNotOwnsGenerator called for id ${id}`);
    const query = {
      text: `SELECT json_agg(generator.*) as generators
        FROM generator WHERE generator.id NOT IN (
        SELECT player_owns_generator.generator_id FROM player_owns_generator
        WHERE player_owns_generator.player_id=$1);`,
      values: [id],
    };
    const playerNotOwnsGenerator = (await client.query(query)).rows[0];
    return playerNotOwnsGenerator;
  },
  /**
   * getPlayerOwnsGenerator
   * @param {number} id player id
   * @returns {[object]} json array of objects with data from player_owns_generator,
   * with only association data of the player
   */
  async getPlayerOwnsGenerator(id) {
    debug(`getPlayerOwnsGenerator called for id ${id}`);
    const query = {
      text: `SELECT json_agg(player_owns_generator.*) as playerOwnsGenerator
        FROM player_owns_generator WHERE player_id=$1;`,
      values: [id],
    };
    const playerOwnsGenerator = (await client.query(query)).rows[0];
    return playerOwnsGenerator;
  },
};

module.exports = playerAccountDataMapper;

const debug = require('debug')('model:player_save');
const client = require('../config/db');
// const ApiError = require('../errors/apiError');

// TODO JSDOC schemas

/**
 * @typedef {object} updateSave -  to send a req.body
 * @property {number} currency - currency of the player
 * @property {number} clickCounter - click counter of the player
 */

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
    if (!generatorsOwned) {
      debug('return empty array');
      const generatorsOwnedZero = {
        generators: [],
      };
      return generatorsOwnedZero;
    }
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
  /**
   * updateCurrencyClick - UPDATE currency and click counter by id
   * @param {number} id - player id
   * @param {number} currency - player currency
   * @param {number} clickCounter - player click counter
   */
  async updateCurrencyClick(id, currency, clickCounter) {
    debug(`updateCurrencyClick called for id ${id}`);
    const query = {
      text: 'UPDATE player SET currency=$1, click_counter=$2 WHERE id=$3;',
      values: [currency, clickCounter, id],
    };
    const playerSaveUpdated = (await client.query(query)).rows[0];
    debug('return:', playerSaveUpdated);
    return playerSaveUpdated;
  },
  /**
   * postGenerator - POST in player_owns_generator new generator for a player
   * @param {number} playerId - id of the player
   * @param {number} generatorId id of the generator
   */
  async postGenerator(playerId, generatorId) {
    debug(`postGenerator called for player ${playerId}, and generator ${generatorId}`);
    const query = {
      text: 'INSERT INTO player_owns_generator (player_id, generator_id) VALUES ($1, $2);',
      values: [playerId, generatorId],
    };
    await client.query(query);
  },
  /**
   * Get the starting_cost of a generator by id
   * @param {number} generatorId - id of the generator
   */
  async getGeneratorStartingCost(generatorId) {
    const query = {
      text: 'SELECT starting_cost FROM generator WHERE id=$1',
      values: [generatorId],
    };
    const generatorCost = (await client.query(query)).rows[0];
    debug('starting cost:', generatorCost);
    return generatorCost;
  },
  async getPlayerOwnsGeneratorByIds(playerId, generatorId) {
    const query = {
      text: 'SELECT * FROM player_owns_generator WHERE player_id=$1 AND generator_id=$2',
      values: [playerId, generatorId],
    };
    const playerOwnsGenerator = (await client.query(query)).rows[0];
    return playerOwnsGenerator;
  },
};

module.exports = playerAccountDataMapper;

const debug = require('debug')('controller:playerSave');
const dataMapper = require('../../models/playerSave');
const save = require('../../services/buildSave');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getSave(req, res) {
    debug(`getSave for player: ${req.decoded.id} ${req.decoded.username}`);
    const playerId = req.decoded.id;
    const playerSave = await save.buildSave(playerId);
    if (!playerSave) {
      throw ApiError('PlayerSave build error', { statusCode: 500 });
    }
    return res.status(200).json({ logged: true, playerSave });
  },
  async updateSave(req, res) {
    debug(`updateSave for player: ${req.decoded.id} ${req.decoded.username}`);
    const playerId = req.decoded.id;
    const { currency, clickCounter } = req.body;
    debug(`currency: ${currency}, click_counter: ${clickCounter}`);
    // update currency and click_counter value
    await dataMapper.updateCurrencyClick(playerId, currency, clickCounter);
    // build updated save
    const playerSave = await save.buildSave(playerId);
    if (!playerSave) {
      throw ApiError('PlayerSave build error', { statusCode: 500 });
    }
    return res.status(200).json({ logged: true, playerSave });
  },
};

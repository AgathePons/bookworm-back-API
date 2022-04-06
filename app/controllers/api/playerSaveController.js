/* eslint-disable max-len */
const debug = require('debug')('controller:playerSave');
const save = require('../../services/buildSave');
// const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getSave(req, res) {
    debug(`getSave for player: ${req.decoded.id} ${req.decoded.username}`);
    const playerId = req.decoded.id;
    const playerSave = await save.buildSave(playerId);
    res.json(playerSave);
  },
};

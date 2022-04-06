/* eslint-disable max-len */
const debug = require('debug')('controller:playerSave');
const save = require('../../services/buildSave');
// const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getSave(req, res) {
    debug(`getSave for player: ${req.params.id}`);
    const playerId = req.decoded.id;
    debug('playerID', playerId);
    const playerSave = save.buildSave(playerId);
    debug('playerSave', playerSave);
    res.json(playerSave);
  },
};

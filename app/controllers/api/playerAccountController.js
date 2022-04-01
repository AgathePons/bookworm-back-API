const debug = require('debug')('controller:playerAccount');
const playerAccountDataMapper = require('../../models/playerAccount');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getOne(req, res) {
    debug(`getOne called params: ${req.params.id}`);
    const playerAccount = await playerAccountDataMapper.findOne(req.params.id);
    if (!playerAccount) {
      throw new ApiError(`player account not found for id ${req.params.id}`, { statusCode: 404 });
    }
    return res.json(playerAccount);
  },
};

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
      throw new ApiError('PlayerSave build error', { statusCode: 500 });
    }
    return res.status(200).json({ logged: true, playerSave });
  },
  async buyNewGenerator(req, res) {
    debug(`updateSave for player: ${req.decoded.id}, generator ${req.params.id}`);
    const playerId = req.decoded.id;
    const generatorId = req.params.id;
    const { currency, clickCounter } = req.body;
    // check if player already has this item
    const playerOwnsGenerator = await dataMapper.getPlayerOwnsGeneratorByIds(playerId, generatorId);
    if (playerOwnsGenerator) {
      throw new ApiError(`Player id ${playerId} already has at least one generator ${generatorId}`);
    }
    // substract the generator satrting_cost from the currency
    const generatorCost = (await dataMapper.getGeneratorStartingCost(generatorId)).starting_cost;
    const newCurrency = currency - generatorCost;
    // check if player has enough money
    if (newCurrency < 0) {
      throw new ApiError(`Player id ${playerId} does not have enough money to buy generator ${generatorId}`);
    }
    //! debug(`generator cost:${generatorCost}, currency:${currency}, newCurrency: ${newCurrency}`);
    // update currency and click_counter value
    await dataMapper.updateCurrencyClick(playerId, newCurrency, clickCounter);
    // add new generator
    await dataMapper.postGenerator(playerId, generatorId);
    // build updated save
    const playerSave = await save.buildSave(playerId);
    if (!playerSave) {
      throw new ApiError('PlayerSave build error', { statusCode: 500 });
    }
    return res.status(200).json({ logged: true, playerSave });
  },
  async disconectAndSave(req, res) {
    debug(`updateSave for player: ${req.decoded.id} ${req.decoded.username}`);
    const playerId = req.decoded.id;
    const { currency, clickCounter } = req.body;
    debug(`currency: ${currency}, click_counter: ${clickCounter}`);
    // update currency and click_counter value
    await dataMapper.updateCurrencyClick(playerId, currency, clickCounter);
    return res.status(200).json({ logged: false });
  },
};

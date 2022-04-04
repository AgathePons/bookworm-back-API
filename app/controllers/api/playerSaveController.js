/* eslint-disable max-len */
const debug = require('debug')('controller:playerSave');
const dataMapper = require('../../models/playerSave');
// const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  /**
   * buildSave: method to build json big and complex object
   * provides all the player saved game datas
   */
  async buildSave(req, res) {
    // player object
    const playerJson = await dataMapper.getOneUserJson(req.params.id);
    const { player } = playerJson;
    delete player.password;
    // generators owned array of objects
    const generatorsOwnedJson = await dataMapper.getGeneratorsOwned(req.params.id);
    const generatorsOwned = generatorsOwnedJson.generators;
    // player owns generator array of objects
    const playerOwnsGeneratorJson = await dataMapper.getPlayerOwnsGenerator(req.params.id);
    const playerOwnsGenerator = playerOwnsGeneratorJson.playerownsgenerator;
    // player not owned generator array of object
    const playerNotOwnsGeneratorJson = await dataMapper.getPlayerNotOwnsGenerator(req.params.id);
    const playerNotOwnsGenerator = playerNotOwnsGeneratorJson.generators;
    // init player bonus
    const playerBonus = {
      clic_flat_bonus: 0,
      clic_percent_bonus: 1,
      idle_flat_bonus: 0,
      idle_percent_bonus: 1,
    };
    // build generatorsOwned + calc bonus
    for (let i = 0; i < generatorsOwned.length; i += 1) {
      const generatorInfo = playerOwnsGenerator.find((element) => element.generator_id === generatorsOwned[i].id);
      // add number owned
      generatorsOwned[i].number_owned = generatorInfo.number_owned;
      // calc next cost
      generatorsOwned[i].next_cost = Math.floor(generatorsOwned[i].starting_cost * Math.pow(generatorsOwned[i].cost_factor, generatorsOwned[i].number_owned));
      // calc total value for each generator
      generatorsOwned[i].total_clic_flat = generatorsOwned[i].clic_flat_value * generatorsOwned[i].number_owned;
      generatorsOwned[i].total_clic_percent = generatorsOwned[i].clic_percent_value * generatorsOwned[i].number_owned;
      generatorsOwned[i].total_idle_flat = generatorsOwned[i].idle_flat_value * generatorsOwned[i].number_owned;
      generatorsOwned[i].total_idle_percent = generatorsOwned[i].idle_percent_value * generatorsOwned[i].number_owned;
      // calc total bonus
      playerBonus.clic_flat_bonus += generatorsOwned[i].total_clic_flat;
      playerBonus.clic_percent_bonus += generatorsOwned[i].total_clic_percent;
      playerBonus.idle_flat_bonus += generatorsOwned[i].total_idle_flat;
      playerBonus.idle_percent_bonus += generatorsOwned[i].total_idle_percent;
    }
    // add generators in player object
    player.generatorsOwned = generatorsOwned;
    // add generators not owned
    player.generatorsNotOwned = playerNotOwnsGenerator;
    // -------------

    // add player bonus to player values
    debug('------------START FINAL CALC--------------------');
    debug('player.idle_value:', player.idle_value);
    debug('player.click_value:', player.click_value);
    player.idle_value += Math.floor(playerBonus.idle_flat_bonus * playerBonus.idle_percent_bonus);
    player.click_value += Math.floor(playerBonus.clic_flat_bonus * playerBonus.clic_percent_bonus);
    debug('bonus:', playerBonus);
    debug('player idle value', player.idle_value);
    debug('player click value', player.click_value);
    res.json(player);
  },
};

const sentenceController = require('./sentenceController');
const playerAccountController = require('./playerAccountController');
const playerSaveController = require('./playerSaveController');

const apiController = {

  home(req, res) {
    const fullURL = `${req.protocol}://${req.get('host')}`;
    return res.json({
      documentation_url: `${fullURL}${process.env.API_DOCUMENTATION_ROUTE}`,
    });
  },
};

module.exports = {
  apiController,
  sentenceController,
  playerAccountController,
  playerSaveController,
};

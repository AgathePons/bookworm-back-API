const object1Controller = require('./object1Controller');
const object2Controller = require('./object2Controller');

const apiController = {
  home(req, res) {
    const fullURL = `${req.protocol}://${req.get('host')}`;
    return res.json({
      documentation_url: `${fullURL}${process.env.API_DOCUMENTATION_ROUTE}`,
    });
  },
};

module.exports = { apiController, object1Controller, object2Controller };

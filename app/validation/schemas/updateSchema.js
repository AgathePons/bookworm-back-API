const Joi = require('joi');

module.exports = Joi.object({
  username: Joi.string().pattern(/[A-Za-z0-9]{3,15}$/),
  // eslint-disable-next-line no-useless-escape
  mail: Joi.string().pattern(/^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/),
}).min(1).required();

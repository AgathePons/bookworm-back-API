const Joi = require('joi');

module.exports = Joi.object({
  // eslint-disable-next-line no-useless-escape
  mail: Joi.string().pattern(/^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/).required(),
  password: Joi.string(),
// .pattern(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*[^"]$/).required(),
}).required();

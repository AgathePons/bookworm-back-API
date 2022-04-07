const Joi = require('joi');

module.exports = Joi.object({
  username: Joi.string().pattern(/[A-Za-z0-9]{3,15}$/).required(),

  password: Joi.string(),
  // .pattern(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*[^"]$/).required(),
  passwordConfirm: Joi.string(),
  // .pattern(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*[^"]$/).required(),
  // eslint-disable-next-line no-useless-escape
  mail: Joi.string().pattern(/^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/).required(),

}).required();

const Joi = require('joi');

module.exports = Joi.object({
  label: Joi.string().required(),
  text_content: Joi.string().required(),
  // key3: Joi.number().integer().min(1).required(),
  // key4: Joi.string().pattern(/^[^-][a-zA-Z0-9-]+[^-]$/).required(),
  // key5: Joi.string(),
}).required();

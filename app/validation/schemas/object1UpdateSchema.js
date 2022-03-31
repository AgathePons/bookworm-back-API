const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  object2_id: Joi.number().integer().min(1),
  // key3: Joi.number().integer().min(1).required(),
  // key4: Joi.string().pattern(/^[^-][a-zA-Z0-9-]+[^-]$/).required(),
  // key5: Joi.string(),
}).min(1).required();

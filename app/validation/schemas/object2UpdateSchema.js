const Joi = require('joi');

module.exports = Joi.object({
  label: Joi.string(),
  text_content: Joi.string(),
  // key3: Joi.number().integer().min(1),
  // key4: Joi.string().pattern(/^[^-][a-zA-Z0-9-]+[^-]$/),
  // key5: Joi.string(),
}).min(1).required();

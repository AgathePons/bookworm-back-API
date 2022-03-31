const debug = require('debug')('Validator:log');
const { ApiError } = require('../helpers/errorHandler');

/**
 * Validator middleware to validate an object property from request
 * @param {string} prop - name of the property to validate (in this API, body from req.body)
 * @param {Joi.object} schema - validation schema from Joi
 * @returns {Function} - Return an Express middleware which validate the req.body
 * of the request using the schema in parameter. Send 400 if validation fails
 */
module.exports = (prop, schema) => async (req, _res, next) => {
  try {
    debug(req[prop]);
    await schema.validateAsync(req[prop]);
    next();
  } catch (err) {
    next(new ApiError(err.details[0].message, { statusCode: 400 }));
  }
};

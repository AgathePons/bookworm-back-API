/**
 * Custom error type for API
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP status code
 * @property {string} message - Error message
 */

module.exports = class ApiError extends Error {
  constructor(message, infos) {
    super(message);
    this.infos = infos;
  }
};

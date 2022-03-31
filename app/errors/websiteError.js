/**
 * Custom error type for website
 * @typedef {object} WebsiteError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP status code
 * @property {string} message - Error message
 */

module.exports = class websiteError extends Error {
  constructor(message, infos) {
    super(message);
    this.infos = infos;
  }
};

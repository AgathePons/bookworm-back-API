const debug = require('debug')('middleware:login');
const { ApiError } = require('../helpers/errorHandler');

const loginMiddleware = {
  async checkLogin(req, res, next) {
    const tempFakeToken = 'test'; // TODO get token in headers
    if (tempFakeToken) {
      // TODO verify token
      next();
    } else {
      throw new ApiError('JWT needed, not logged', { statusCode: 403 });
    }
  },
};

module.exports = loginMiddleware;

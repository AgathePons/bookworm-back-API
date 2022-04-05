const debug = require('debug')('middleware:login');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../helpers/errorHandler');

const loginMiddleware = {
  async checkLogin(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (!!token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    debug('token', token);
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          throw new ApiError('JWT not valid, not logged', { statusCode: 403 });
        } else {
          req.decoded = decoded;
          debug('decoded', decoded);
          next();
        }
      });
    } else {
      throw new ApiError('JWT needed, not logged', { statusCode: 403 });
    }
  },
};

module.exports = loginMiddleware;

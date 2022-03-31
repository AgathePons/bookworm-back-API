const express = require('express');

const myObject1Router = require('./myObject1');
const myObject2Router = require('./myObject2');
const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

// send json
router.use((_, res, next) => {
  res.type('json');
  next();
});

router.all('/', apiController.home);

router.use('/myObjects1', myObject1Router);
router.use('/myObjects2', myObject2Router);

// 404
router.use(() => {
  throw new ApiError('API route not found', { statusCode: 404 });
});

module.exports = router;

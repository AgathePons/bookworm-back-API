const express = require('express');

const sentenceRouter = require('./sentence');
const playerAccountRouter = require('./playerAccount');
const playerSave = require('./playerSave');
const login = require('./login');
const disconect = require('./disconect');

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

// send json
router.use((_, res, next) => {
  res.type('json');
  next();
});

router.all('/', apiController.home);

router.use('/sentence', sentenceRouter);
router.use('/playerAccount', playerAccountRouter);
router.use('/save', playerSave);
router.use('/login', login);
router.use('/disconect', disconect);

// 404
router.use(() => {
  throw new ApiError('API route not found', { statusCode: 404 });
});

module.exports = router;

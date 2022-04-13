const express = require('express');

const { websiteController } = require('../../controllers/website/websiteController');
const { WebsiteError } = require('../../helpers/errorHandler');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

// send html
router.use((_req, res, next) => {
  res.type('html');
  next();
});

router.get('/', controllerHandler(websiteController.home));

// 404
router.use(() => {
  throw new WebsiteError('Page introuvable', { statusCode: 404 });
});

module.exports = router;

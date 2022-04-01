const express = require('express');

const { playerAccountController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/:id')
  .get(controllerHandler(controller.getOne));

module.exports = router;

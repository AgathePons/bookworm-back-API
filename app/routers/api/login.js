const express = require('express');

const { playerAccountController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
   * POST /api/login/
   * @summary login to player account
   * @tags Player account
   * @param {playerLogin} request.body.required - json object with input fields values from front
   */
  .post(controllerHandler(controller.login));

module.exports = router;

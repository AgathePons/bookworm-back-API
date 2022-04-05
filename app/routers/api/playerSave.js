const express = require('express');

const { playerSaveController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');
const checkLogin = require('../../middleware/checkLogin');

const router = express.Router();

router
  .route('/')
  /**
   * GET /api/save/
   * @summary Get a player save JSON object
   * @tags Player save
   * @security BearerAuth
   * @return {object} 200 - success response - application/json
   * @return {ApiError} 404 - Not found response - application/json
   */
  .get(controllerHandler(checkLogin.checkLogin), controllerHandler(controller.buildSave));

module.exports = router;

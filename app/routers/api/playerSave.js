const express = require('express');

const { playerSaveController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');
const checkLogin = require('../../middleware/checkLogin');

const router = express.Router();

router
  .route('/')
  /**
   * PATCH /api/save/
   * @summary Get a player save JSON object
   * @tags Player save
   * @security BearerAuth
   * @param {updateSave} request.body.required - json object with input fields values from front
   * @return {object} 200 - success response - application/json
   * @return {ApiError} 404 - Not found response - application/json
   */
  .patch(controllerHandler(checkLogin.checkLogin), controllerHandler(controller.updateSave));

module.exports = router;

const express = require('express');

const { playerSaveController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');
const checkLogin = require('../../middleware/checkLogin');

const router = express.Router();

router
  .route('/')
  /**
   * PATCH /api/disconect/
   * @summary disconected player
   * @tags Player account
   * @security BearerAuth
   * @param {updateSave} request.body.required - json object with input fields values from front
   */
  .patch(controllerHandler(checkLogin.checkLogin), controllerHandler(controller.disconectAndSave));

module.exports = router;

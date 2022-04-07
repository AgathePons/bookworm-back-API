const express = require('express');

const { playerSaveController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
   * PATCH /api/disconect/
   * @summary disconected player
   * @tags Player account
   * @param {updateSave} request.body.required - json object with input fields values from front
   */
  .patch(controllerHandler(controller.disconectAndSave));

module.exports = router;

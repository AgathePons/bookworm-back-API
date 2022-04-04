const express = require('express');

const { playerSaveController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/:id')
  /**
   * GET /api/save/{id}
   * @summary Get a player save JSON object
   * @tags Player save
   * @param {number} id.path.required - id of the player
   * @return {object} 200 - success response - application/json
   * @return {ApiError} 404 - Not found response - application/json
   */
  .get(controllerHandler(controller.buildSave));

module.exports = router;

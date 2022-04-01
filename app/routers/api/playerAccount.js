const express = require('express');

const { playerAccountController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/:id')
  /**
   * GET /api/playerAccount/{id}
   * @summary Get a player account info
   * @tags Player account
   * @param {number} id.path.required - id of the player
   * @return {PlayerAccount} 200 - success response - application/json
   * @return {ApiError} 404 - Not found response - application/json
   */
  .get(controllerHandler(controller.getOne));

module.exports = router;

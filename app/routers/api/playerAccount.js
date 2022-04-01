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
  .get(controllerHandler(controller.getOne))
  /**
   * PATCH /api/playerAccount/{id}
   * @summary Update a player account info
   * @tags Player account
   * @param {number} id.path.required - id of the player in params route
   * @param {playerInput} request.body.required - json object with input fields values from front
   * @return {PlayerAccount} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - player not found - application/json
   */
  .patch(controllerHandler(controller.update));

router
  .route('/')
  /**
   * POST /api/playerAccount/
   * @summary create a player account
   * @tags Player account
   * @param {playerInput} request.body.required - json object with input fields values from front
   * @return {PlayerAccount} 200 - success response - application/json
   * @return {ApiError} 404 - Not found response - application/json
   */
  .post(controllerHandler(controller.create));

module.exports = router;

const express = require('express');

const validate = require('../../validation/validator');
const registerSchema = require('../../validation/schemas/registerSchema');
const updateSchema = require('../../validation/schemas/updateSchema');
const { playerAccountController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');
const checkLogin = require('../../middleware/checkLogin');

const router = express.Router();

router
  .route('/')
  /**
   * GET /api/playerAccount/
   * @summary Get a player account info
   * @tags Player account
   * @security BearerAuth
   * @return {PlayerAccount} 200 - success response - application/json
   * @return {ApiError} 404 - Not found response - application/json
   */
  .get(controllerHandler(checkLogin.checkLogin), controllerHandler(controller.getOne))
  /**
   * PATCH /api/playerAccount/
   * @summary Update a player account info
   * @tags Player account
   * @security BearerAuth
   * @param {playerUpdate} request.body.required - json object with input fields values from front
   * @return {} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - player not found - application/json
   */
  .patch(controllerHandler(checkLogin.checkLogin), validate('body', updateSchema), controllerHandler(controller.update))
/**
     * DELETE /api/playerAccount/
     * @summary Delete one player
     * @tags Player account
     * @security BearerAuth
     * @return {PlayerAccount} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Post not found - application/json
     */
  .delete(controllerHandler(checkLogin.checkLogin), controllerHandler(controller.delete));

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
  .post(validate('body', registerSchema), controllerHandler(controller.create));

module.exports = router;

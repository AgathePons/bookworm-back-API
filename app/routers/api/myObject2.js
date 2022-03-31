const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/object2CreateSchema');
const updateSchema = require('../../validation/schemas/object2UpdateSchema');

const { object2Controller: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
   * GET /api/myObjects2
   * @summary Get all objects 2
   * @tags Object2
   * @return {[Object2]} 200 - success response - application/json
   */
  .get(controllerHandler(controller.getAll))
  /**
   * POST /api/myObjects2
   * @summary Create an object2
   * @tags Object2
   * @param {Object2Input} request.body.required - object2 data needed in req.body
   * @return {Object1} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   */
  .post(validate('body', createSchema), controllerHandler(controller.create));

router
  // number id only
  .route('/:id(\\d+)')
  /**
   * GET /api/myObjects2/{id}
   * @summary Get one object 2
   * @tags Object2
   * @param {number} id.path.required - object2 identifier
   * @return {Object2} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Post not found - application/json
   */
  .get(controllerHandler(controller.getOne))
  /**
   * PATCH /api/myObjects2/{id}
   * @summary Update one object 2
   * @tags Object2
   * @param {number} id.path.required - object2 identifier
   * @param {Object2Input} request.body.required - object2 data needed in req.body
   * @return {Object2} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Post not found - application/json
   */
  .patch(validate('body', updateSchema), controllerHandler(controller.update))
  /**
   * DELETE /api/myObjects2/{id}
   * @summary Delete one object 2
   * @tags Object2
   * @param {number} id.path.required - object1 identifier
   * @return {Object2} 200 - success response - application/json
   * @return {ApiError} 400 - Bad request response - application/json
   * @return {ApiError} 404 - Post not found - application/json
   */
  .delete(controllerHandler(controller.delete));

module.exports = router;

const express = require('express');

const { sentenceController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
  .route('/')
  /**
   * GET /api/sentence
   * @summary Get a random sentence
   * @tags Sentence
   * @return {Sentence} 200 - success response - application/json
   */
  .get(controllerHandler(controller.getRandom));

router
  .route('/first')
  /**
   * GET /api/sentence/first
   * @summary Get the first sentence
   * @tags Sentence
   * @return {Sentence} 200 - success response - application/json
   */
  .get(controllerHandler(controller.getFirst));

module.exports = router;

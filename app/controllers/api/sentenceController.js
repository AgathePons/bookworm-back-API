const debug = require('debug')('controller:sentence');
const sentenceDataMapper = require('../../models/sentence');
// const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getAll(_req, res) {
    debug('getAll called');
    const sentences = await sentenceDataMapper.findAll();
    return res.json(sentences);
  },
  async getRandom(_req, res) {
    debug('getRandom called');
    const sentences = await sentenceDataMapper.findAll();
    const randomSentence = sentences[Math.floor(Math.random() * (sentences.length - 1 + 1)) + 1];
    return res.json(randomSentence);
  },
  async getFirst(_req, res) {
    debug('getFirst called');
    const firstSentence = await sentenceDataMapper.findOne(1);
    return res.json(firstSentence);
  },
};

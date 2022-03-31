const debug = require('debug')('controller:objects2');
const object2DataMapper = require('../../models/object2');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getAll(_req, res) {
    debug('getAll called');
    const objects2 = await object2DataMapper.findAll();
    return res.json(objects2);
  },
  async getOne(req, res) {
    debug(`getOne called params: ${req.params.id}`);
    const object2 = await object2DataMapper.findByPk(req.params.id);
    if (!object2) {
      throw new ApiError(`Object2 not found for id ${req.params.id}`, { statusCode: 404 });
    }
    return res.json(object2);
  },
  async create(req, res) {
    debug('create called');
    // Check if unique fields values do not already exist
    const existingObject2 = await object2DataMapper.isUnique(req.body);
    if (existingObject2) {
      let field;
      // check if new unique fields values do not already exist
      if (existingObject2.label === req.body.label) {
        field = 'label';
      } else if (existingObject2.text_content === req.body.text_content) {
        field = 'text_content';
      }
      throw new ApiError(`Object2 already exists with this ${field}`, { statusCode: 404 });
    }
    const insertedObject2 = await object2DataMapper.insert(req.body);
    return res.json(insertedObject2);
  },
  async update(req, res) {
    const object2 = await object2DataMapper.findByPk(req.params.id);
    if (!object2) {
      throw new ApiError(`Object2 not found for id ${req.params.id}`, { statusCode: 404 });
    }
    // if at least one field has been updated
    if (req.body.label || req.body.text_content) {
      const existingObject2 = await object2DataMapper.isUnique(req.body, req.params.id);
      if (existingObject2) {
        let field;
        // check if new unique fields values do not already exist
        if (existingObject2.label === req.body.label) {
          field = 'label';
        } else if (existingObject2.text_content === req.body.text_content) {
          field = 'text_content';
        }
        throw new ApiError(`Other object2 already exists with this ${field}`, { statusCode: 404 });
      }
    }
    debug('all update verif done');
    const updatedObject2 = await object2DataMapper.update(req.params.id, req.body);
    return res.json(updatedObject2);
  },
  async delete(req, res) {
    const object2 = await object2DataMapper.findByPk(req.params.id);
    if (!object2) {
      throw new ApiError(`Object2 not found for id ${req.params.id}`, { statusCode: 404 });
    }
    await object2DataMapper.delete(req.params.id);
    return res.status(204).json();
  },
};

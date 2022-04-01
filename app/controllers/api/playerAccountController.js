const debug = require('debug')('controller:playerAccount');
const bcrypt = require('bcrypt');
const playerAccountDataMapper = require('../../models/playerAccount');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getOne(req, res) {
    debug(`getOne called params: ${req.params.id}`);
    const playerAccount = await playerAccountDataMapper.findOne(req.params.id);
    if (!playerAccount) {
      throw new ApiError(`player account not found for id ${req.params.id}`, { statusCode: 404 });
    }
    delete playerAccount.password;
    return res.json(playerAccount);
  },
  async create(req, res) {
    debug('create called', req.body);
    const existingUsername = await playerAccountDataMapper.findByUsername(req.body.username);
    const existingMail = await playerAccountDataMapper.findByMail(req.body.mail);

    if (existingUsername) {
      throw new ApiError(`${req.body.username} already exists in db for username`, { statusCode: 500 });
    }
    if (existingMail) {
      throw new ApiError(`${req.body.mail} already exists in db for mail`, { statusCode: 500 });
    }
    if (req.body.password !== req.body.passwordConfirm) {
      throw new ApiError('password confirm failed', { statusCode: 418 });
    }

    const salt = await bcrypt.genSalt(5);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    const newAccount = {
      username: req.body.username,
      mail: req.body.mail,
      password: encryptedPassword,
    };

    const newPlayer = await playerAccountDataMapper.insert(newAccount);
    return res.json(newPlayer);
  },
};

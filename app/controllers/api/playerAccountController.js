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
      throw new ApiError(`${req.body.username} already exists in db for username`, { statusCode: 400 });
    }
    if (existingMail) {
      throw new ApiError(`${req.body.mail} already exists in db for mail`, { statusCode: 400 });
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

  async update(req, res) {
    debug('update player account');
    const player = await playerAccountDataMapper.findOne(req.params.id);
    if (!player) {
      throw new ApiError(`player with id  ${req.params.id} not found`, { statusCode: 404 });
    }
    if (req.body.username || req.body.mail || (req.body.password && req.body.passwordConfirm)) {
      if (req.body.password && req.body.passwordConfirm) {
        if (req.body.password !== req.body.passwordConfirm) {
          throw new ApiError('password confirm failed', { statusCode: 400 });
        }
        delete req.body.passwordConfirm;
        const salt = await bcrypt.genSalt(5);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = encryptedPassword;
      }
      if (req.body.username) {
        const existingUsername = await playerAccountDataMapper.findByUsername(req.body.username);
        if (existingUsername) {
          throw new ApiError(`${req.body.username} already exists in db for username`, { statusCode: 400 });
        }
      }
      if (req.body.mail) {
        const existingMail = await playerAccountDataMapper.findByMail(req.body.mail);
        if (existingMail) {
          throw new ApiError(`${req.body.mail} already exists in db for mail`, { statusCode: 400 });
        }
      }
      debug('all verifs done return updated user');
      const updatedPlayer = await playerAccountDataMapper.update(req.params.id, req.body);
      return res.json(updatedPlayer);
    }
    debug('verifs fail, return user');
    delete player.password;
    return res.json(player);
  },

  async delete(req, res) {
    const player = await playerAccountDataMapper.findOne(req.params.id);
    if (!player) {
      throw new ApiError('This player does not exists', { statusCode: 404 });
    }

    await playerAccountDataMapper.delete(req.params.id);
    return res.status(204).json();
  },
  async login(req, res) {
    const player = await playerAccountDataMapper.findByMail(req.body.mail);
    debug(player);
    if (!player) {
      throw new ApiError('This usermail / password does not exists', { statusCode: 403 });
    }
    debug(`login with mail: ${req.body.mail}, password: ${req.body.password}`);
    debug('bcrypt');
    // const salt = await bcrypt.genSalt(5);
    const validPassword = await bcrypt.compare(req.body.password, player.password);
    debug('valid pswd:', validPassword);
    if (!validPassword) {
      throw new ApiError('This usermail / password does not exists', { statusCode: 403 });
    }
    delete player.password;
    // TODO JWT process
    const tempFakeToken = '123azerty';
    return res.status(200).json({ player, tempFakeToken });
  },
};

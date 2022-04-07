const debug = require('debug')('controller:playerAccount');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const playerAccountDataMapper = require('../../models/playerAccount');
const save = require('../../services/buildSave');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getOne(req, res) {
    debug(`getOne called params: ${req.decoded.id}`);
    const playerAccount = await playerAccountDataMapper.findOne(req.decoded.id);
    if (!playerAccount) {
      throw new ApiError(`player account not found for id ${req.decoded.id}`, { statusCode: 404 });
    }
    delete playerAccount.password;
    return res.json(playerAccount);
  },
  async create(req, res) {
    debug('create called', req.body);
    const existingUsername = await playerAccountDataMapper.findByUsername(req.body.username);
    const existingMail = await playerAccountDataMapper.findByMail(req.body.mail);
    // check if username already exists
    if (existingUsername) {
      throw new ApiError(`${req.body.username} already exists in db for username`, { statusCode: 400 });
    }
    // check if mail already exists
    if (existingMail) {
      throw new ApiError(`${req.body.mail} already exists in db for mail`, { statusCode: 400 });
    }
    // check if password matches with passwordConfirm
    if (req.body.password !== req.body.passwordConfirm) {
      throw new ApiError('password confirm failed', { statusCode: 418 });
    }
    // encrypt password
    const salt = await bcrypt.genSalt(5);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    // build new account data
    const newAccount = {
      username: req.body.username,
      mail: req.body.mail,
      password: encryptedPassword,
    };
    // insert in db
    const newPlayer = await playerAccountDataMapper.insert(newAccount);
    // create jwt
    const expireIn = 24 * 60 * 60;
    const payload = {
      id: newPlayer.id,
      username: newPlayer.username,
    };
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: expireIn,
      },
    );
    // set headers Authorization with jwt
    res.header('Authorization', `Bearer ${token}`);
    debug('token:', token);
    // build save
    debug('new player', newPlayer);
    const playerSave = await save.buildSave(newPlayer.id);
    if (!playerSave) {
      throw ApiError('PlayerSave build error', { statusCode: 500 });
    }
    return res.status(200).json({ logged: true, token, playerSave });
  },

  async update(req, res) {
    debug('update player account');
    const player = await playerAccountDataMapper.findOne(req.decoded.id);
    if (!player) {
      throw new ApiError(`player with id  ${req.decoded.id} not found`, { statusCode: 404 });
    }
    if (req.body.username || req.body.mail) {
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
      const updatedPlayer = await playerAccountDataMapper.update(req.decoded.id, req.body);
      return res.json(updatedPlayer);
    }
    debug('verifs fail, return user');
    delete player.password;
    return res.json(player);
  },

  async delete(req, res) {
    const player = await playerAccountDataMapper.findOne(req.decoded.id);
    if (!player) {
      throw new ApiError('This player does not exists', { statusCode: 404 });
    }

    await playerAccountDataMapper.delete(req.decoded.id);
    return res.status(204).json();
  },
  async login(req, res) {
    const player = await playerAccountDataMapper.findByMail(req.body.mail);
    // check if email exists
    if (!player) {
      throw new ApiError('This usermail / password does not exists', { statusCode: 403 });
    }
    // check if password is valid
    const validPassword = await bcrypt.compare(req.body.password, player.password);
    if (!validPassword) {
      throw new ApiError('This usermail / password does not exists', { statusCode: 403 });
    }
    delete player.password;
    // create jwt
    const expireIn = 24 * 60 * 60;
    const payload = {
      id: player.id,
      username: player.username,
    };
    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: expireIn,
      },
    );
    // set headers Authorization with jwt
    res.header('Authorization', `Bearer ${token}`);
    debug('token:', token);
    await playerAccountDataMapper.updateLogoutTime(player.id);
    const playerSave = await save.buildSave(player.id);
    if (!playerSave) {
      throw ApiError('PlayerSave build error', { statusCode: 500 });
    }
    return res.status(200).json({ logged: true, token, playerSave });
  },
};

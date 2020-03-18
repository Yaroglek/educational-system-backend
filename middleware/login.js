/**
 * @file 登录中间件
 * @module middle/login
 */
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username
  }).select('+password');
  assert(user && bcrypt.compareSync(req.body.password, user.password) && user.active, 422, '用户名或密码错误');
  req.username = user.username;
  req.user = JSON.parse(JSON.stringify(user));
  delete req.user._id;
  delete req.user.password;
  next();
}
/**
 * @file 查询用户中间件
 * @module middle/getUser
 */
const User = require('./../models/User');
const assert = require('http-assert');
const constants = require('./../core/constants');

module.exports = async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne(
    { username },
  );
  delete user._id;
  assert(req.username[0] === constants.userType.admin || user.username === req.username, 403, '禁止访问');
  req.user = JSON.parse(JSON.stringify(user));
  delete req.user._id
  next();
}
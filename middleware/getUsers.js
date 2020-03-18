/**
 * @file 查询用户中间件
 * @module middle/getUsers
 */
const User = require('./../models/User');
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const users = await User.find({ active: true });
  req.users = JSON.parse(JSON.stringify(users));
  req.users.forEach(user => delete user._id);
  next();
}
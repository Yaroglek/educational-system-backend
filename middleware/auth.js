/**
 * @file 权限认证中间件
 * @module middle/auth
 */
const jsonwebtoken = require('jsonwebtoken')
const assert = require('http-assert')
const User = require('./../models/User')
const CONFIG = require('./../app.config')

module.exports = async (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ').pop()
  assert(token, 401, '请先登录');
  const {username, time} = jsonwebtoken.verify(token, CONFIG.AUTH.jwtTokenSecret);
  assert(time > Date.now(), 401, '请重新登录')
  const user = await User.findOne({
    username
  });
  assert(user.username && user.active, 401, '请先登录');
  req.username = username;
  next();
}
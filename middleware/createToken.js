/**
 * @file 生成Token中间件
 * @module middle/createToken
 */
const jsonwebtoken = require('jsonwebtoken')
const CONFIG = require('./../app.config')

module.exports = async (req, res, next) => {
  const token = jsonwebtoken.sign({
    username: req.username,
    time: Date.now() + CONFIG.AUTH.maxAge
  }, CONFIG.AUTH.jwtTokenSecret);
  req.token = token;
  next();
}
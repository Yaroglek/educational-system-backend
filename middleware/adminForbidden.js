/**
 * @file 禁止教务员中间件
 * @module middle/adminForbidden
 */
const assert = require('http-assert');
const constants = require('./../core/constants');

module.exports = async (req, res, next) => {
  assert(req.username[0] !== constants.userType.admin, 403, '禁止访问');
  next();
}
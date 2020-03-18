/**
 * @file 禁止学生中间件
 * @module middle/studentForbidden
 */
const assert = require('http-assert');
const constants = require('./../core/constants');

module.exports = async (req, res, next) => {
  assert(req.username[0] !== constants.userType.student, 403, '禁止访问');
  next();
}
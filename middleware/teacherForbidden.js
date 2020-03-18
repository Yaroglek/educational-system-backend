/**
 * @file 禁止教师中间件
 * @module middle/teacherForbidden
 */
const assert = require('http-assert');
const constants = require('./../core/constants');

module.exports = async (req, res, next) => {
  assert(req.username[0] !== constants.userType.teacher, 403, '禁止访问');
  next();
}
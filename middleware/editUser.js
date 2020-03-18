/**
 * @file 编辑用户中间件
 * @module middle/editUser
 */
const User = require('./../models/User');
const CourseRecord = require('./../models/CourseRecord');
const Counter = require('./../models/Counter');
const { COURSE_STATUS } = require('../core/constants');
const constants = require('./../core/constants');
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const username = req.params.username;
  assert(req.body.user.active === undefined && req.username[0] === constants.userType.admin || req.username === username, 403, '禁止访问');
  const user = await User.findOneAndUpdate(
    { username },
    req.body.user
  );
  next();
}
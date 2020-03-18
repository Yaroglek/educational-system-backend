/**
 * @file 删除用户中间件
 * @module middle/deleteUser
 */
const User = require('./../models/User');
const CourseRecord = require('./../models/CourseRecord');
const Counter = require('./../models/Counter');
const constants = require('../core/constants');

module.exports = async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOneAndUpdate(
    { username },
    { active: false }
  );
  await CourseRecord.findOneAndUpdate(
    { student: user._id },
    { status: constants.courseStatus.fail },
    { multi: true }
  );
  next();
}
/**
 * @file 编辑课程中间件
 * @module middle/editCourse
 */
const Course = require('./../models/Course');
const User = require('./../models/User');
const CourseRecord = require('./../models/CourseRecord');
const Counter = require('./../models/Counter');
const constants = require('./../core/constants');
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const courseRecord = await CourseRecord.findOne({
    id: req.params.id
  }).populate({
    path: 'course',
    select: 'teacher -_id'
  });
  const user = await User.findById(courseRecord.course.teacher);
  assert(req.username[0] === constants.userType.admin && req.body.courseRecord.score === undefined
    || req.username === user.username && req.body.courseRecord.status === undefined && courseRecord.status === constants.courseRecordStatus.success, 403, '禁止访问');
  await courseRecord.updateOne(
    req.body.courseRecord
  );
  next();
}
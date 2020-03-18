/**
 * @file 编辑课程中间件
 * @module middle/editCourse
 */
const Course = require('./../models/Course');
const CourseRecord = require('./../models/CourseRecord');
const Counter = require('./../models/Counter');
const { COURSE_STATUS } = require('../core/constants');
const constants = require('./../core/constants');
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const course = await Course.findOne({
    id: req.params.id
  }).populate({
    path: 'teacher',
    select: 'username name -_id'
  });
  assert(req.username[0] === constants.userType.admin || req.username === course.teacher.username && req.body.course.status === 0, 403, '禁止访问');
  delete req.body.course.teacher
  await Course.findOneAndUpdate(
    { id: req.params.id },
    req.body.course
  );
  next();
}
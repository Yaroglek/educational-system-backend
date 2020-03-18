/**
 * @file 新建选课记录中间件
 * @module middle/login
 */
const Course = require('./../models/Course');
const Counter = require('./../models/Counter');
const CourseRecord = require('./../models/CourseRecord');
const User = require('./../models/User');
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.student
  });
  const course = await Course.findOne({
    id: req.body.course
  })
  const counter = await Counter.findOne({
    type: 'courseRecord'
  })
  assert(!(await CourseRecord.findOne({
    course: course._id,
    student: user._id
  })), 409, '不能重复选课')
  await CourseRecord.create({
    id: (5000000 + counter.counter).toString(),
    course: course._id,
    student: user._id
  });
  counter.counter++;
  await counter.save();
  next();
}
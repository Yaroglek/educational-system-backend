/**
 * @file 新建课程中间件
 * @module middle/login
 */
const Course = require('./../models/Course');
const Counter = require('./../models/Counter');
const User = require('./../models/User');

module.exports = async (req, res, next) => {
  const {course} = req.body;
  const teacher = await User.findOne({
    username: course.teacher.username
  });
  course.teacher = teacher._id;
  const counter = await Counter.findOne({
    type: 'course'
  });
  course.id = (4000000 + counter.counter).toString();
  req.newCourse = await Course.create(course);
  counter.counter++;
  await counter.save();
  next();
}
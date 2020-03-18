/**
 * @file 查询课程中间件
 * @module middle/getCourses
 */
const Course = require('./../models/Course');
const User = require('./../models/User')
const assert = require('http-assert');

module.exports = async (req, res, next) => {
  const courses = await Course.find().populate({
    path: 'teacher',
    select: 'username name -_id'
  })
  req.courses = JSON.parse(JSON.stringify(courses));
  req.courses.forEach(course => {
    delete course._id;
  });
  next();
}
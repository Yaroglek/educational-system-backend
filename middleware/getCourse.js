/**
 * @file 查询课程中间件
 * @module middle/getCourse
 */
const User = require('./../models/User');
const Course = require('./../models/Course');
const CourseRecord = require('./../models/CourseRecord');
const assert = require('http-assert');
const constants = require('./../core/constants');

module.exports = async (req, res, next) => {
  const course = await Course.findOne({
    id: req.params.id
  }).populate({
    path: 'teacher',
    select: 'username name -_id'
  })
  req.course = JSON.parse(JSON.stringify(course));
  delete req.course._id;
  if (req.username === course.teacher.username || req.username[0] === '3') {
    const courseRecords = await CourseRecord.find({
      course: course._id
    }).populate({
      path: 'student',
      select: 'username name -_id'
    })
    req.course.courseRecords = JSON.parse(JSON.stringify(courseRecords));
    req.course.courseRecords.forEach(courseRecord => {
      delete courseRecord._id;
      delete courseRecord.course;
    });
  }
  next();
}
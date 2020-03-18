/**
 * @file 查询选课记录中间件
 * @module middle/getCourseRecordsByStudent
 */
const User = require('../models/User');
const assert = require('http-assert');
const constants = require('./../core/constants');
const CourseRecord = require('./../models/CourseRecord');
const Course = require('./../models/Course');

module.exports = async (req, res, next) => {
  const user = await User.findOne({
    username: req.username
  });
  const courseRecords = await CourseRecord.find({
    student: user._id
  }).populate({
    path: 'course',
    select: 'id name scoreParts -_id'
  });
  req.courseRecords = JSON.parse(JSON.stringify(courseRecords));
  req.courseRecords.forEach(courseRecord => {
    delete courseRecord._id;
    courseRecord.finalScore = courseRecord.score.reduce((last, curr, index) => last + curr * courseRecord.course.scoreParts[index].weight, 0) / 100;
  })
  next();
}
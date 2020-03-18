/**
 * @file 选课记录模型
 * @module model/user
 */
const mongoose = require('mongoose');
const { courseRecordStatus } = require('../core/constants')


const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: Number,
    default: courseRecordStatus.waiting
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  score: [{
    type: Number,
    default: 0
  }]
});

module.exports = mongoose.model('CourseRecord', schema);
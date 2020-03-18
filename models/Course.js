/**
 * @file 课程模型
 * @module model/user
 */
const mongoose = require('mongoose');
const { courseStatus } = require('../core/constants')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: courseStatus.waiting
  },
  description: {
    type: String,
    default: ''
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  scoreParts: [{
    part: {
      type: String,
      default: ''
    },
    weight: {
      type: Number,
      default: 0
    }
  }]
});

module.exports = mongoose.model('Course', schema);
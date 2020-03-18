/**
 * @file 计数器模型
 * @module model/counter
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  type: {
    type: String,
    default: ''
  },
  counter: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Counter', schema);
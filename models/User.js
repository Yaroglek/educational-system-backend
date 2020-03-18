/**
 * @file 用户模型
 * @module model/user
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    set(value) {
      return bcrypt.hashSync(value);
    }
  },
  name: {
    type: String,
    default: ''
  },
  sex: {
    type: Boolean,
    default: false
  },
  major: {
    type: String,
    default: ''
  },
  birth: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

module.exports = mongoose.model('User', schema)
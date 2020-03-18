/**
 * @file 数据库
 * @module core/mongodb
 */
const consola = require('consola');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const CONFIG = require('./../app.config')

const connect = () => {
  mongoose.connect(CONFIG.MONGODB.uri, CONFIG.MONGODB.options)
  mongoose.connection.on('error', info => {
    consola.error('数据库连接失败!', info)
  })
  mongoose.connection.on('open', () => {
    consola.ready('数据库连接成功!')
  })
  autoIncrement.initialize(mongoose.connection)
  return mongoose
}

module.exports = connect
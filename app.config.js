/**
 * @file 应用运行配置
 * @module app.config
 */
const path = require('path')
const APP = {
  LIMIT: 10,
  PORT: 8000,
  ROOT_PATH: __dirname,
  FRONT_END_PATH: path.join(__dirname, '..', 'frontend')
}
const CROSS_DOMAIN = {
  allowedOrigins: [
    'http://localhost:3000'
  ]
}
const MONGODB = {
  uri: 'mongodb://localhost:27017/backend',
  options: {
    user: 'root',
    pass: 'TOOR',
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}
const AUTH = {
  jwtTokenSecret: '12U9DSNVOL59ZM0Q',
  defaultPassword: 'root',
  maxAge: 600000
}
module.exports = {
  APP,
  CROSS_DOMAIN,
  MONGODB,
  AUTH
}

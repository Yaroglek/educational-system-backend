/**
 * @file 新建用户中间件
 * @module middle/login
 */
const User = require('./../models/User');
const Counter = require('./../models/Counter');

module.exports = async (req, res, next) => {
  const {user, type} = req.body;
  const counter = await Counter.findOne({
    type: type === '1' && 'student' || type === '2' && 'teacher' || type === '3' && 'admin'
  });
  user.username = (type * 1000000 + counter.counter).toString();
  req.newUser = await User.create(user);
  counter.counter++;
  await counter.save();
  next();
}
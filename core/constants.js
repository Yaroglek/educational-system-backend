/**
 * @file 数据库常量
 * @module core/constants
 */

// 用户类别
module.exports = {
  userType: {
    student: '1',
    teacher: '2',
    admin: '3',
  },
  term: {
    automn: 0,
    spring: 1
  },
  courseStatus: {
    waiting: 0,
    cancel: -1,
    success: 1,
  },
  courseRecordStatus: {
    waiting: 0,
    fail: -1,
    success: 1
  }
}
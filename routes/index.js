const express = require('express')
const middleware = require('./../middleware')

const router = express.Router({
  mergeParams: true
});

module.exports = app => {
  router.get('/users/:username',
    middleware.auth,
    middleware.createToken,
    middleware.getUser,
    (req, res, next) => {
      res.send({
        user: req.user,
        token: req.token
      })
    }
  );
  router.get('/users',
    middleware.auth,
    middleware.createToken,
    middleware.getUsers,
    (req, res, next) => {
      res.send({
        users: req.users,
        token: req.token,
      })
    }
  );
  router.post('/users',
    middleware.auth,
    middleware.createToken,
    middleware.studentForbidden,
    middleware.teacherForbidden,
    middleware.createUser,
    (req, res, next) => {
      res.send({
        token: req.token,
        message: `新建用户${req.newUser.username} ${req.newUser.name}`
      })
    }
  );
  router.put('/users/:username',
    middleware.auth,
    middleware.createToken,
    middleware.editUser,
    (req, res, next) => {
      res.send({
        token: req.token,
        message: '编辑成功'
      })
    }
  );
  router.delete('/users/:username',
    middleware.auth,
    middleware.createToken,
    middleware.studentForbidden,
    middleware.teacherForbidden,
    middleware.deleteUser,
    (req, res, next) => {
      res.send({
        token: req.token,
        message: '删除成功'
      })
    }
  );
  router.post('/login',
    middleware.login,
    middleware.createToken,
    (req, res, next) => {
      res.send({
        username: req.user.username,
        name: req.user.name,
        token: req.token,
        message: '登录成功'
      })
    }
  );
  router.get('/courses',
    middleware.auth,
    middleware.createToken,
    middleware.getCourses,
    (req, res, next) => {
      res.send({
        token: req.token,
        courses: req.courses
      })
    }
  );
  router.get('/courses/:id',
    middleware.auth,
    middleware.createToken,
    middleware.getCourse,
    (req, res, next) => {
      res.send({
        token: req.token,
        course: req.course
      })
    }
  );
  router.post('/courses',
    middleware.auth,
    middleware.createToken,
    middleware.studentForbidden,
    middleware.adminForbidden,
    middleware.createCourse,
    (req, res, next) => {
      res.send({
        token: req.token,
        course: req.newCourse
      })
    }
  );
  router.put('/courses/:id',
    middleware.auth,
    middleware.createToken,
    middleware.studentForbidden,
    middleware.editCourse,
    (req, res, next) => {
      res.send({
        token: req.token,
        message: '编辑成功'
      });
    }
  );
  router.post('/course_records',
    middleware.auth,
    middleware.createToken,
    middleware.teacherForbidden,
    middleware.adminForbidden,
    middleware.createCourseRecord,
    (req, res, next) => {
      res.send({
        token: req.token,
        message: '选课成功，请等待审核'
      })
    }
  );
  router.get('/course_records/:username',
    middleware.auth,
    middleware.createToken,
    middleware.teacherForbidden,
    middleware.adminForbidden,
    middleware.getCourseRecordsByStudent,
    (req, res, next) => {
      res.send({
        token: req.token,
        courseRecords: req.courseRecords
      })
    }
  );
  router.put('/course_records/:id',
    middleware.auth,
    middleware.createToken,
    middleware.studentForbidden,
    middleware.editCourseRecord,
    (req, res, next) => {
      res.send({
        token: req.token,
        message: '修改成功'
      })
    }
  )
  app.use(router, async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
};

const express = require('express');
const cors = require('cors');
const path = require('path');
const CONFIG = require('./app.config');
const mongodb = require('./core/mongodb');
const routes = require('./routes');
const User = require('./models/User');
const Counter = require('./models/Counter');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}));
app.use(express.json());

async function init() {
  const studentCounter = await Counter.findOne({
    type: 'student'
  });
  if (!studentCounter) {
    Counter.create({
      type: 'student'
    });
  }
  const teacherCounter = await Counter.findOne({
    type: 'teacher'
  });
  if (!teacherCounter) {
    Counter.create({
      type: 'teacher'
    });
  }
  const adminCounter = await Counter.findOne({
    type: 'admin'
  });
  if (!adminCounter) {
    Counter.create({
      type: 'admin'
    });
  }
  const Users = await User.find();
  if (Users.length === 0) {
    await User.create({
      username: '3' + '000001',
      password: 'admin',
      name: '默认管理员'
    });
  }
  const courseCounter = await Counter.findOne({
    type: 'course'
  });
  if (!courseCounter) {
    Counter.create({
      type: 'course',
      counter: 2
    })
  }
  const courseRecordCounter = await Counter.findOne({
    type: 'courseRecord'
  })
  if (!courseRecordCounter) {
    Counter.create({
      type: 'courseRecord'
    })
  }
}
init();

mongodb(app);
routes(app);

app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(3001, () => {
  console.log(server.address());
});

module.exports = app;
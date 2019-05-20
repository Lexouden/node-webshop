var io = require('../../app').io

const ProductController = require('./ProductController');
const UserController = require('./UserController');
const CategoryController = require('./CategoryController');


io.on('connection', (socket) => {
  socket.on('login', ({
    user,
    pass
  }) => {
    console.log(user, pass)
    UserController.login(user, pass)
  });
});
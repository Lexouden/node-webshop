var io = require('../../app').io

const ProductController = require('./ProductController');
const UserController = require('./UserController');
const CategoryController = require('./CategoryController');

io.on('connection', (socket) => {

  /**
   * Handle Login API / Socket call
   */
  socket.on('login', ({
    user,
    pass
  }) => {
    UserController.login({
      user: user,
      pass: pass
    }, (user, callback) => {

      socket.emit('logincb', {
        user: user,
        cb: callback
      });
    });
  });

  /**
   * Handle Product API / Socket call
   */
  socket.on('products', (category) => {
    ProductController.getProducts(category, (products) => {
      if (!products || products === null) return socket.emit('productscb', null);
      if (products) return socket.emit('productscb', products);
    })
  })
});
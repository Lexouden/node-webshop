const USER = require('../models/User');
var app = require('../../app')

app.io.on('connection', (socket) => {
  socket.on('login', ({
    user,
    pass
  }) => {
    console.log(user, pass)
  });
});
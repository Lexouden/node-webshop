var io = require('../../app').io

io.on('connection', (socket) => {
  socket.on('login', ({
    user,
    pass
  }) => {
    console.log(user, pass)
    login(user, pass)
  });
});

module.exports = () => {
  const User = require('../models/User');

  function login(user, pass) {
    User.findOne({
      username: user
    }, (err, user) => {
      if (err) return console.error('An error occurred while retrieving user:', `\n${err}`);
      user.comparePassword(pass, (err, callback) => {
        if (err) return console.error('An error occurred while authenticating:', `\n${err}`);
        if (callback === true) return console.log(`User '${user}' logged in succesfully`);
      })
    });
  }

  function newUser(data) {
    var newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password
    });

    newUser.save((err) => {
      if (err) return console.error('An error occurred while creating a new user:', `\n${err}`);
    });
  }
}
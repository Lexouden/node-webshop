const User = require('../models/User');

exports.login = (user, pass) => {
  User.findOne({
    username: user
  }, (err, user) => {
    if (err) return console.error('An error occurred while retrieving user:', `\n${err}`);
    if (user === null) return console.error('User not found.')
    User.comparePassword(pass, (err, callback) => {
      if (err) return console.error('An error occurred while authenticating:', `\n${err}`);
      if (callback === true) return console.log(`User '${user}' logged in succesfully`);
    })
  });
}

exports.newUser = (data) => {
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
const User = require('../models/User');

exports.login = ({
  username,
  password
}, callback) => {
  User.findOne({
    username: username
  }, (err, user) => {
    if (err) return console.error('An error occurred while retrieving user:', `\n${err}`);
    if (user === null) return console.error('User not found.');
    User.comparePassword(password, (err, callback) => {
      if (err) return console.error('An error occurred while authenticating:', `\n${err}`);
      if (callback === true) return console.log(`User '${user}' logged in successfully`);
    });
    delete user.password;
    callback(user, true);
  });
}

exports.newUser = (data, callback) => {
  var newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password
  });

  newUser.save((err) => {
    if (err) return console.error('An error occurred while creating a new user:', `\n${err}`);
    callback(true);
  });
}

exports.editUser = () => {

}

exports.deleteUser = (data, callback) => {
  User.findByIdAndDelete(data, err => {
    if (err) return console.error(`An error occurred while trying to delete a User: \n${err}`);
  });
}
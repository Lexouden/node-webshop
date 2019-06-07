const User = require("../models/User");

exports.login = ({ user, pass }, callback) => {
  User.findOne(
    {
      username: user
    },
    (err, user) => {
      if (err)
        return console.error(
          "An error occurred while retrieving user:",
          `\n${err}`
        );
      if (user === null) {
        callback(null, false);
        return console.error("User not found.");
      }
      user.comparePassword(pass, (err, callback) => {
        if (err)
          return console.error(
            "An error occurred while authenticating:",
            `\n${err}`
          );
        if (callback === true)
          return console.log(`User '${user.username}' logged in successfully`);
      });
      delete user.password;
      delete user.permissions;
      delete user.orders;

      callback(user, true);
    }
  );
};

exports.newUser = (data, callback) => {
  var newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password
  });

  newUser.save(err => {
    if (err)
      return console.error(
        "An error occurred while creating a new user:",
        `\n${err}`
      );
    callback(true);
  });
};

exports.editUser = () => {};

exports.deleteUser = (data, callback) => {
  User.findByIdAndDelete(data, err => {
    if (err)
      return console.error(
        `An error occurred while trying to delete a User: \n${err}`
      );
  });
};

exports.registerSA = data => {
  User.findOne(
    {
      username: data.username
    },
    (err, user) => {
      if (err) throw new Error(err);
      if (!user || user === null) {
        var newSA = new User({
          firstName: data.firstName,
          lastName: data.lastName,
          email: `${dat.firstname}.${data.lastname}@gmail.com`,
          username: data.username,
          password: data.password,
          permissions: {
            role: "Administrator"
          }
        });

        newSA.save(err => {
          if (err)
            return console.error(
              "An error occurred while creating a new Super Admin:",
              `\n${err}`
            );
        });
      }
    }
  );
};

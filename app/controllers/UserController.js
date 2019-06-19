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

      User.findById(user._id, "-password -permissions", (err, user) => {
        if (err)
          return console.error(
            "An error occurred while getting user:",
            `\n${err}`
          );
        if (user) callback(user, true);
      });
    }
  );
};

exports.newUser = (data, callback) => {
  var newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
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

exports.getOrders = (id, callback) => {
  User.findById(id, "orders", (err, data) => {
    if (err)
      return console.error(
        `An error occurred while requesting User data: \n${err}`
      );

    if (data.orders !== null) {
      return callback(data.orders, true);
    } else {
      return callback(null, false);
    }
  });
};

exports.editUser = (id, update, callback) => {
  User.findByIdAndUpdate(id, update, err => {
    if (err)
      return console.error(`An error occurred while updating a User: \n${err}`);
    return callback(true);
  });
};

exports.updateUser = (update, id, callback) => {
  User.findById(id, (err, user) => {
    if (err)
      return console.error(`An error occurred while requesting User: \n${err}`);
    if (user.orders === null) {
      user.orders = [];
      user.orders.push(update);
    } else {
      user.orders.push(update);
    }

    User.findByIdAndUpdate(id, { orders: user.orders }, err => {
      if (err)
        return console.error(
          `An error occurred while adding order to User: \n${err}`
        );
      callback(update, true);
    });
  });
};

exports.deleteUser = (data, callback) => {
  User.findByIdAndDelete(data, err => {
    if (err)
      return console.error(
        `An error occurred while trying to delete a User: \n${err}`
      );
    return callback(true);
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
          email: `${data.firstname}.${data.lastname}@gmail.com`,
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

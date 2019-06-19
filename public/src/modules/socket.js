var socket = io("http://localhost:3000");

export async function login({ username, password }, callback) {
  socket.emit("login", {
    user: username,
    pass: password
  });

  socket.on("logincb", ({ user, cb }) => {
    return callback(user, cb);
  });
}

export async function products(category, callback) {
  socket.emit("products", category);

  socket.on("productscb", products => {
    return callback(products);
  });
}

export async function categories(callback) {
  socket.emit("categories");

  socket.on("categoriescb", categories => {
    return callback(categories);
  });
}

export async function checkout(data, id, callback) {
  socket.emit("checkout", data, id);

  socket.on("checkoutcb", orders => {
    return callback(orders, true);
  });
}

export async function orders(id, callback) {
  socket.emit("orders", id);

  socket.on("orderscb", orders => {
    return callback(orders, true);
  });
}

export async function register(data, callback) {
  var firstname = data.find(element => element.name === "Firstname").value,
    lastname = data.find(element => element.name === "Lastname").value,
    username = data.find(element => element.name === "username").value,
    password = data.find(element => element.name === "password").value,
    email = data.find(element => element.name === "email").value;

  var user = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: password
  };

  socket.emit("register", user);

  socket.on("registercb", cb => {
    callback(cb);
  });
}

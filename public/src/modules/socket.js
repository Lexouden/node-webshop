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

export async function checkout(data, callback) {
  socket.emit("checkout", data);

  socket.on("checkoutcb", () => {
    return callback(true);
  });
}

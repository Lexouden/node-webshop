var socket = io('http://localhost:3000');
export async function login({
  username,
  password
}, callback) {
  socket.emit('login', {
    user: username,
    pass: password
  });

  socket.on('logincb', ({
    user,
    cb
  }) => {
    callback(user, cb);
  });
}
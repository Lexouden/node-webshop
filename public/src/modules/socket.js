var socket = io('http://localhost:3000');
export async function login(user, pass) {
  socket.emit('login', {
    user: user,
    pass: pass
  });
  console.log('Sending login data')
}
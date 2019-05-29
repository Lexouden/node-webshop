var app = require('../app');
var auth = require('../app/auth').


app.post('/auth', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/login')

app.get('*', () => {
  console.log('Back end routing called')
})
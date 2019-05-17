console.clear();

// Require NPM modules
var createError = require('http-errors');
var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

// Some globally accessible vars
global.config = require('./config/config');
module.exports.db = mongoose = require('mongoose');

// Require auth controller
require('./app/auth');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make the app use the html files from public
app.use('/', express.static('./public', {
  extensions: ['html']
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Create database connection
 */
require('./app/database');
mongoose.connect(`mongodb://${config.database.host}/${config.database.database}`, {
  useNewUrlParser: true
})

/**
 * Create server
 */
var port = normalizePort(process.env.PORT || config.server.port);
app.set('port', port);

var server = http.createServer(app);

/**
 * Make websocket connection
 */
module.exports.io = io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  });
});

/**
 * Require all controllers
 */
require('./app/controllers/UserController');
require('./app/controllers/CategoryController');
require('./app/controllers/ProductController');

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(`Listening on ${port}`)
}
var mongoose = require('../app.js').db;
var registerSA = require('../app/controllers/UserController').registerSA;
var seed = require('../app/seed.js');

mongoose.connect(`mongodb://${config.database.host}/${config.database.database}`, {
  useNewUrlParser: true
});

registerSA({
  firstName: config.SAUsername,
  lastName: '',
  username: config.SAUsername,
  password: config.SAPassword
});

seed.seedCategories();
seed.seedProducts();
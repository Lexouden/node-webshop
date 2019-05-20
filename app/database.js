var mongoose = require('../app.js').db;

mongoose.connect(`mongodb://${config.database.host}/${config.database.database}`, {
  useNewUrlParser: true
});
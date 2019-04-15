var mongoose = require('../app.js').db;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Model requirement
module.exports.Product = require('./models/Product')

mongoose.connect(`mongodb://${config.database.host}/${config.database.database}`, {
  useNewUrlParser: true
});
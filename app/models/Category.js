var mongoose = require('./../../app.js').db;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Category Model
var CategorySchema = new Schema({
  category_id: ObjectId,
  category_name: String,
  products: Object
});

module.exports = mongoose.model('Category', CategorySchema);
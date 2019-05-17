var mongoose = require('../../app.js').db;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Product Model
var ProductSchema = new Schema({
  id: ObjectId,
  name: String,
  description: String,
  category: String,
  SearchName: String,
  stock: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  reviews: {
    type: Object,
    default: null
  }
});

module.exports = mongoose.model('Product', ProductSchema);
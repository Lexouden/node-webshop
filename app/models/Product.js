var mongoose = require('./../../app.js').db;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

module.exports = () => {
  const Product = new Schema({
    product_id: ObjectId,
    product_name: String,
    product_description: String,
    SearchName: String,
    price: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
}
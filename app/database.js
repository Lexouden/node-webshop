var mongoose = require('../app.js').db;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Model requirement
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

mongoose.connect(`mongodb://${config.database.host}/${config.database.database}`, {
  useNewUrlParser: true
});

function createNewProduct({
  product_name,
  product_description,
  SearchName,
  price
}) {
  const newProduct = new Product;

  newProduct.product_name = product_name;
  newProduct.product_description = product_description;
  newProduct.SearchName = SearchName;
  newProduct.price = price;

  newProduct.save((err) => {
    if (err) console.error(err)
  });
}

function newUser({
  username,
  first_name,
  last_name,
  password
}) {
  const newUser = new User;

  newUser.username = username;
  newUser.first_name = first_name;
  newUser.last_name = last_name;
  newUser.password = password;

  newUser.save((err) => {
    if (err) console.error(err);
  });
}
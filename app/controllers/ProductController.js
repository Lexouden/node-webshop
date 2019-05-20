const Product = require("../models/Product"); // Import the Product model

exports.getProducts = (data, callback) => {
  // Retrieve products data from database
  Product.find({
      SearchName: data
    },
    (err, product) => {
      if (err)
        console.error(
          "An error occurred while getting the Products:",
          `\n${err}`
        );
      console.log(product);
    }
  );
}

exports.getProduct = (data, callback) => {
  // Retrieve product data from database
  Product.findOne({
      SearchName: data
    },
    (err, product) => {
      if (err)
        console.error(
          "An error occurred while getting the Product:",
          `\n${err}`
        );
      console.log(product);
    }
  );
}

exports.newProduct = (data, callback) => {
  // Create a new Product
  if (!data) return console.error("No data found."); // Check if data present

  let newProduct = new Product({
    name: data.name,
    description: data.description,
    category: data.category,
    SearchName: data.SearchName || data.name,
    stock: data.stock,
    price: data.price
  });

  newProduct.save(err => {
    if (err) {
      console.error(
        "An error occurred while saving a new Product:",
        `\n${err}`
      );
    }
  });
}

exports.editProduct = (id, update, callback) => {
  // Edit an existing product
  Product.findByIdAndUpdate(id, update, (err) => {
    if (err) return console.error('An error occurred when updating a Product:', `\n${err}`)
  });
}

exports.deleteProduct = (id, callback) => {
  // Remove a product from the database
  Product.findByIdAndDelete(id, err => {
    if (err)
      return console.error("An error occurred while deleting a Product:", `\n${err}`);
  });
}
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const faker = require('faker');

/**
 * Seed product table with Products
 */
exports.seedProducts = async () => {
  var randomProductName,
    randomPrice,
    randomQuantity,
    randomCategory,
    categories = new Array

  await CategoryController.getCategories((data, callback) => {
    if (!callback) return;
    if (!data) return;

    data.forEach(category => {
      categories.push(category.category_name);
    });

    for (let i = 0; i <= 150; i++) {
      randomProduct(categories);
    }
  });

  function randomProduct(categories) {
    randomProductName = faker.commerce.productName();
    randomPrice = faker.commerce.price(2, 100, 2);
    randomQuantity = faker.random.number(9999);
    randomCategory = faker.random.arrayElement(categories);

    console.log(randomProductName, randomPrice, randomQuantity, randomCategory)
  }


}

exports.seedCategories = () => {
  var categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  categories.forEach(category => {
    CategoryController.getCategories((data, callback) => {
      if (!callback) return console.log(data);
      if (!data) {
        CategoryController.newCategory({
          name: category
        });
      }
    });
  });
}

exports.seedUsers = () => {};
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const faker = require("faker");

/**
 * Seed product table with Products
 */
exports.seedProducts = async () => {
  var randomProductName,
    randomPrice,
    randomQuantity,
    randomCategory,
    randomDescription,
    categories = new Array();

  await CategoryController.getCategories((data, callback) => {
    if (!callback) return;
    if (!data) return;

    data.forEach(category => {
      categories.push(category._id);
    });

    ProductController.getProducts({}, data => {
      if (data === undefined || data.length == 0) {
        for (let i = 0; i <= 150; i++) {
          randomProduct(categories);
          if (i === 150) {
            console.log("Products seeded in database!");
          }
        }
      }
    });
  });

  function randomProduct(categories) {
    randomProductName = faker.commerce.productName();
    randomPrice = faker.commerce.price(2, 100, 2);
    randomQuantity = faker.random.number(9999);
    randomCategory = faker.random.arrayElement(categories);
    randomDescription = faker.lorem.sentence();

    ProductController.newProduct({
      name: randomProductName,
      description: randomDescription,
      category: randomCategory,
      stock: randomQuantity,
      price: randomPrice
    });
  }
};

exports.seedCategories = async () => {
  var categories = [
    "Category-A",
    "Category-B",
    "Category-C",
    "Category-D",
    "Category-E",
    "Category-F"
  ];

  await CategoryController.getCategories((data, callback) => {
    if (!callback) return console.log(data);
    if (data === undefined || data.length == 0) {
      console.log("Seeding database");
      categories.forEach(category => {
        console.log(`Inserting ${category}`);
        CategoryController.newCategory({
          name: category
        });
      });
    }
  });
};

exports.seedUsers = () => {};

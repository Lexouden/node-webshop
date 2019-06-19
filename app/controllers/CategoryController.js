const Category = require("../models/Category");

exports.getCategories = async callback => {
  // Get all Categories
  Category.find({}, null, { sort: { category_name: 1 } }, (err, categories) => {
    if (err) {
      // Error handle
      console.error(
        "An error occurred while fetching the Categories:",
        `\n${err}`
      );
      return callback(null, false);
    }

    return callback(categories, true);
  });
};

exports.newCategory = (data, callback) => {
  // Create a new Category
  if (!data) {
    // Check if required data is present
    return callback("Missing data.", false);
  }

  let newCategory = new Category({
    category_name: data.name
  });

  newCategory.save(err => {
    if (err) {
      console.error(
        "An error occurred while making a new Category:",
        `\n${err}`
      );
      return callback(null, false);
    }
  });
};

exports.editCategory = (id, update, callback) => {
  // Update an existing Category
  Category.findByIdAndUpdate(id, update, err => {
    if (err)
      return console.error(
        `An error occurred while trying to update a Category: \n${err}`
      );
    return callback(true);
  });
};

exports.deleteCategory = (data, callback) => {
  // Delete a category from the database
  Category.findByIdAndDelete(data, err => {
    if (err) {
      console.error("An error occurred while deleting a Category:", `\n${err}`);
      return callback(false);
    }
    return callback(true);
  });
};

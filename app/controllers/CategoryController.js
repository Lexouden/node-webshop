const Category = require("../models/Category");

exports.getCategories = (data, callback) => {
  Category.find({}, (err, categories) => {
    if (err) {
      // Error handle
      console.error(
        "An error occurred while fetching the Categories:",
        `\n${err}`
      );
      return callback(null, false);
    }

    return callback(categories);
  });
};

exports.newCategory = (data, callback) => {
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

exports.editCategory = (data, callback) => {};

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

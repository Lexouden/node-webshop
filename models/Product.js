module.exports = class Product {
  constructor({
    id,
    name,
    SearchName,
    category
  }) {
    this.id;
    this.name;
    this.SearchName;
    this.category;
  }

  get getID() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getSearchName() {
    return this.getSearchName;
  }

  set setCategory(category) {
    this.category = category;
  }
}
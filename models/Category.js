module.exports = class Category {
  constructor({
    type,
    description
  }) {
    this.type;
    this.description;
  }

  get getDescription() {
    return this.description;
  }
}
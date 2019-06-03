const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const ipsumstring =
  "Aliquip nulla deserunt deserunt ea aliqua aliqua labore enim. Ex cillum exercitation dolor commodo adipisicing exercitation duis cupidatat exercitation aute deserunt. Sit exercitation magna excepteur consequat laborum voluptate dolor veniam laboris fugiat adipisicing laborum anim mollit. Do in magna dolor amet dolor. Et do ipsum proident cupidatat ipsum ea deserunt laboris. Aliquip irure incididunt qui reprehenderit aute laboris. In consequat qui ex ad eiusmod id id nostrud nulla quis dolor anim. Adipisicing sint dolore proident sit reprehenderit. Aute nostrud ullamco duis esse esse aute nisi ut. Amet excepteur cupidatat quis veniam voluptate mollit duis irure anim aute eiusmod cillum. Magna reprehenderit aliquip duis duis exercitation consequat excepteur fugiat in irure nisi ut occaecat voluptate. Amet mollit ipsum adipisicing enim labore ea enim ex. Nulla ut ipsum deserunt commodo tempor cillum labore. Nulla nulla est commodo consectetur cillum amet mollit ex sunt occaecat. Culpa et commodo duis reprehenderit commodo velit cupidatat ea magna laboris officia do esse. Ea excepteur laborum esse dolor culpa enim elit consequat fugiat labore velit enim adipisicing exercitation. Magna ullamco commodo adipisicing laboris fugiat ut fugiat ad id quis consequat occaecat. Ut incididunt sint anim anim duis ipsum dolore labore. Sint nisi cupidatat quis non. Non consequat laborum consequat commodo voluptate magna enim do.";
var ipsum = ipsumstring.split(" ");
/**
 * Seed product table with Products
 */
exports.seedProducts = () => {};

function getRandomPrice(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomName() {
  var name = ipsum[Math.floor(Math.random() * ipsum.length)];
  ipsum.pop(name);
  return name;
}

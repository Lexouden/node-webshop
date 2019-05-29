import {
  render
} from 'lit-html';
import {
  Cart
} from './components/cart.js';
import {
  Product
} from './components/product.js';
import {
  Category
} from './components/category.js';
import './modules/socket.js';
import {
  products
} from './modules/socket.js';

var cart = $('.cart');
cart.on('click', renderCart);

renderProducts()

function renderProducts(category) {
  products({
    category
  }, (products) => {
    render(Product(products), document.getElementById('products'));
  });
}

function renderCategories() {
  render(Category(), document.getElementById('categories'));
}

function renderCart() {
  var container_content = document.getElementById('cartcontainer').innerHTML;
  if (container_content !== "") {
    render(Cart(), document.getElementById('cartcontainer'));
    $('#shopcart').modal('toggle');
  } else {
    render(Cart(), document.getElementById('cartcontainer'));
    $('#shopcart').modal('toggle');
  }
}

window.renderProducts = renderProducts;
window.renderCategories = renderCategories;

// Check for service worker
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

// Generate random ID
export async function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
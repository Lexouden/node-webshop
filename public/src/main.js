import {
  render
} from 'lit-html';
import './components/cart.js';
import {
  Product
} from './components/product.js';

function renderProducts() {
  render(Product([{
      product_name: `Test`,
      product_description: 'Test product for the webshop',
      price: Number(20.00).toFixed(2)
    },
    {
      product_name: `Test`,
      product_description: 'Test product for the webshop',
      price: Number(20.00).toFixed(2)
    },
    {
      product_name: `Test`,
      product_description: 'Test product for the webshop',
      price: Number(20.00).toFixed(2)
    },
    {
      product_name: `Test`,
      product_description: 'Test product for the webshop',
      price: Number(20.00).toFixed(2)
    }
  ]), document.getElementById('products'));
}

function addToShopCart() {
  sessionStorage.setItem('cart', JSON.stringify([{
    item: '',
    amount: 1,
    price: 1
  }]))

  var data = JSON.parse(sessionStorage.getItem('cart'));
  console.log(data)
}

if (location === `http://${location.hostname}:8081`) location = `http://${location.hostname}:8081/shop`;


window.addToShopCart = addToShopCart;
window.renderProducts = renderProducts

var ws = new WebSocket('ws://localhost:3000/socket');

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
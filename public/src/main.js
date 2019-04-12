import {
  html,
  render
} from 'lit-html';
import './components/cart.js';
import {
  Product
} from './components/product.js';


render(Product([{
    product_name: `Test`,
    product_description: 'Test product for the webshop',
    price: '20,00'
  },
  {
    product_name: `Test`,
    product_description: 'Test product for the webshop',
    price: '20,00'
  },
  {
    product_name: `Test`,
    product_description: 'Test product for the webshop',
    price: '20,00'
  },
  {
    product_name: `Test`,
    product_description: 'Test product for the webshop',
    price: '20,00'
  }
]), document.getElementById('products'));

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
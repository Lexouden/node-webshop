import {
  render
} from 'lit-html';
import './components/cart.js';
import {
  Product
} from './components/product.js';
import {
  Category
} from './components/category.js';

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

function renderCategories() {
  render(Category(
    [{
        category_id: 1,
        category_name: 'Category 1',
      },
      {
        category_id: 2,
        category_name: 'Category 2',
      },
      {
        category_id: 3,
        category_name: 'Category 3',
      },
      {
        category_id: 4,
        category_name: 'Category 4',
      },
      {
        category_id: 5,
        category_name: 'Category 5',
      }
    ]
  ), document.getElementById('categories'));
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

window.addToShopCart = addToShopCart;
window.renderProducts = renderProducts;
window.renderCategories = renderCategories;

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
import {
  html
} from 'lit-html';

var itemTemplates = [];

export const Product = (data) => html `
  ${loadList(data)}
`;

function loadList(items) {
  for (const item of items) {
    itemTemplates.push(html `
      <div class="product">
        <h2 class="header">${item.product_name}</h2>
        <p class="description">${item.product_description}</p>
        <p class="price">€${item.price}</p> 
        <div class="btn" onclick="addToCart(this)" data-price="${item.price}" data-title="${item.product_name}">Add to cart</div> 
        <div class="quickview" onclick="quickView(this)" data-description="${item.product_description}" data-price="${item.price}" data-title="${item.product_name}">Quickview</div> 
      </div>
    `);
  }

  return html `${itemTemplates}`;
}
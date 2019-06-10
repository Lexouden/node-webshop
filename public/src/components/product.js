import { html } from "lit-html";

var itemTemplates = [];

export const Product = data => html`
  ${loadList(data)}
`;

function loadList(items) {
  for (const item of items) {
    itemTemplates.push(html`
      <div class="product">
        <h2 class="header">${item.name}</h2>
        <p class="description">${item.description}</p>
        <p class="price">€${item.price}</p>
        <div
          class="btn"
          onclick="addToCart(this)"
          data-price="${item.price}"
          data-title="${item.name}"
        >
          Add to cart
        </div>
        <div
          class="quickview"
          onclick="quickView(this)"
          data-description="${item.description}"
          data-price="${item.price}"
          data-title="${item.name}"
        >
          Quickview
        </div>
      </div>
    `);
  }

  return html`
    ${itemTemplates}
  `;
}

import { html } from "lit-html";

var itemTemplates = [];

export const Category = data => html`
  <button class="btn btn-primary d-inline pr-4" onclick="renderProducts()">
    All
  </button>
  ${loadList(data)}
`;

function loadList(items) {
  for (const item of items) {
    itemTemplates.push(html`
      <button
        class="btn btn-primary d-inline pr-4"
        onclick="renderProducts('${item._id}')"
      >
        ${item.category_name}
      </button>
    `);
  }

  return html`
    ${itemTemplates}
  `;
}

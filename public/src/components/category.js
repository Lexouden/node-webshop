import { html } from "lit-html";

var itemTemplates = [];

export const Category = data => html`
  ${loadList(data)}
`;

function loadList(items) {
  for (const item of items) {
    itemTemplates.push(html`
      <button class="btn btn-primary d-inline pr-4" data-category="${item._id}">
        ${item.category_name}
      </button>
    `);
  }

  return html`
    ${itemTemplates}
  `;
}

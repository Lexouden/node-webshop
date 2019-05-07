import {
  html
}
from 'lit-html';

var itemTemplates = [];

export const Category = (data) => html `
  ${loadList(data)}
`;

function loadList(items) {
  for (const item of items) {
    itemTemplates.push(html `
      <h3 class="text-light d-inline pr-4">${item.category_name}</h3>
    `);
  }

  return html `${itemTemplates}`;
}
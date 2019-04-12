import {
  html,
  render
} from 'lit-html';
import {
  LitElement,
  css
} from 'lit-element';

const itemTemplates = [];

/**
 * *Create custom element
 */
export class Cart extends LitElement {
  render(data) {
    return cartItem(data);
  }
}

customElements.define('cart-element', Cart)

const cartItem = (data) => html `
<h1 class="${data.titleClass}">${data.items.length} ${getItemAmount(data.items.length)} in cart.</h1>
<ul class="cartlist list-group list-group-flush">
  <li class="list-group-item list-group-item-dark">Item <span class="float-right">Price</span><span class="float-right mr-5">Amount</span></li>
  ${loadList(data.items)}
  <li class="list-group-item list-group-item-dark"> 
    <hr>
    <span class="float-right">Subtotal without Tax: €${priceTotalWithoutTax(data.items)}</span><br>
    <span class="float-right">Subtotal with Tax: €${priceTotalTax(data.items)}</span>
  </li>
  <li class="list-group-item list-group-item-dark">
    
</ul>
`;

function getItemAmount(length) {
  if (length > 1) {
    return html `items`;
  } else if (length < 1) {
    return html `items`;
  } else {
    return html `item`;
  }
}

function loadList(items) {
  for (const item of items) {
    itemTemplates.push(html ` <li class="list-group-item list-group-item-dark">${item.name} <span class="float-right">€${item.price}</span> <span class="float-right mr-5">${item.amount}</span></li>`);
  }

  return html `${itemTemplates}`;
}

function priceTotalTax(items) {
  let total = 0;

  for (let i of items) {
    if (i !== null) total += i.price;
  }

  return total;
}

function priceTotalWithoutTax(items) {
  let total = 0;

  for (let i of items) {
    let price = i.price - (i.price / 100 * 21);
    if (i !== null) total += Math.round(price)
  }

  return total;
}
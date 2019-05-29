import {
  html
} from 'lit-html';

const itemTemplates = [];
var cart = JSON.parse(sessionStorage.getItem('cart'));

export const Cart = () => html `
<div class="modal fade" id="shopcart" tabindex="-1" role="dialog" aria-labelledby="cart" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="cart">Cart</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul class="cartlist list-group list-group-flush">
          <li class="list-group-item">Item <span class="float-right">Price</span><span class="float-right mr-5">Amount</span></li>
          ${loadList()}
          <li class="list-group-item"> 
            <hr>
            <span class="float-right">Total</span><br>
            <span class="float-right">No VAT: €${Number(totalWithoutTax()).toFixed(2)}</span><br>
            <span class="float-right">With VAT: €${Number(totalWithTax()).toFixed(2)}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;

function loadList() {
  cart = JSON.parse(sessionStorage.getItem('cart'));
  for (const item of cart) {
    itemTemplates.push(html `<li class="list-group-item">${item.name} <span class="float-right">€${Number(item.price*item.amount).toFixed(2)}</span><span class="float-right mr-5"><button class="btn btn-danger fa fa-minus" data-title="${item.name}" onclick="$removeFromCart"></button> <input value="${item.amount}" style="text-align: center" size="1" onchange="updateCart(this)"> <button class="btn btn-success fa fa-plus" data-title="${item.name}" onclick="addToCart(this)"></button></span></li>`);
  }

  return html `${itemTemplates}`;
}

function totalWithTax() {
  let total = 0;

  for (let i of cart) {
    if (i !== null) total += i.price * i.amount;
  }

  return total;
}

function totalWithoutTax() {
  let total = 0;

  for (let i of cart) {
    let price = i.price * i.amount - (i.price / 100 * 21);
    if (i !== null) total += price;
  }

  return total;
}

function totalItems() {
  let total = 0;

  for (let item of cart) {
    if (item !== 0) total += item.amount;
  }

  return total
}
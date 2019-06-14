import { LitElement, css, html } from "lit-element";

var itemTemplates = [];
var cart = JSON.parse(sessionStorage.getItem("cart"));

export class CartElement extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      .float-right {
        float: right;
      }

      .list-group-item {
      }

      .cartlist {
        list-style-type: none;
      }

      .list-group {
      }

      .list-group-flush {
      }

      #amount-title {
        margin-right: 100px;
      }

      #amount {
        margin-right: 65px;
      }
    `;
  }
  render() {
    return html`
      <ul class="cartlist list-group list-group-flush">
        <li class="list-group-item">
          Item <span class="float-right">Price</span
          ><span class="float-right" id="amount-title">Amount</span>
        </li>
        ${loadList()}
        <li class="list-group-item">
          <hr />
          <span class="float-right" id="total-title">Total</span><br />
          <span class="float-right"
            >No VAT: €${Number(totalWithoutTax()).toFixed(2)}</span
          ><br />
          <span class="float-right"
            >With VAT: €${Number(totalWithTax()).toFixed(2)}</span
          ><br />
          <button class="float-right" id="checkoutbtn">
            Proceed to Checkout
          </button>
        </li>
      </ul>
    `;
  }
}

customElements.define("cart-element", CartElement);

export const Cart = () => html`
  <div
    class="modal fade"
    id="shopcart"
    tabindex="-1"
    role="dialog"
    aria-labelledby="cart"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cart-title">Cart</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="cart-modal"></div>
      </div>
    </div>
  </div>
`;

function loadList() {
  cart = JSON.parse(sessionStorage.getItem("cart"));
  itemTemplates = [];
  if (cart && cart.length !== 0) {
    for (let item of cart) {
      itemTemplates.push(
        html`
          <li class="list-group-item">
            ${item.name}
            <span class="float-right">
              €${Number(item.price * item.amount).toFixed(2)}
            </span>
            <span class="float-right" id="amount">
              <button
                class="btn btn-danger fa fa-minus"
                data-title="${item.name}"
                onclick="removeFromCart(this)"
              >
                -
              </button>
              <input
                value="${item.amount}"
                data-title="${item.name}"
                style="text-align: center"
                size="1"
                onchange="updateCart(this)"
              />
              <button
                class="btn btn-success fa fa-plus"
                data-title="${item.name}"
                onclick="addToCart(this)"
              >
                +
              </button>
              <button
                class="btn"
                data-title="${item.name}"
                onclick="removeFromCart(this, 'remove')"
              >
                x
              </button>
            </span>
          </li>
        `
      );
    }
  } else {
    itemTemplates.push(
      html`
        <li class="list-group-item">
          No items in cart
        </li>
      `
    );
  }

  return html`
    ${itemTemplates}
  `;
}

function totalWithTax() {
  let total = 0;

  if (cart) {
    for (let i of cart) {
      if (i !== null) total += i.price * i.amount;
    }
  }

  return total;
}

function totalWithoutTax() {
  let total = 0;

  if (cart) {
    for (let i of cart) {
      let price = i.price * i.amount - (i.price / 100) * 21;
      if (i !== null) total += price;
    }
  }

  return total;
}

function totalItems() {
  let total = 0;

  if (cart) {
    for (let item of cart) {
      if (item !== 0) total += item.amount;
    }
  }

  return total;
}

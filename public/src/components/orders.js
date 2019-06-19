import { LitElement, html, css } from "lit-element";

// Import external components
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item";

export const Orders = data => html`
  <div
    class="modal fade"
    id="orders"
    tabindex="-1"
    role="dialog"
    aria-labelledby="orders"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="order-title">Orders</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="order-modal"></div>
        <div id="order-content" role="listbox">
          ${loadOrders(data)}
        </div>
      </div>
    </div>
  </div>
`;

function loadOrders(data) {
  let templates = [];
  // load Orders
  if (data === false) {
    templates.push(html`
      <h4>
        No orders found.
      </h4>
    `);
  } else {
    for (const order of data) {
      templates.push(html`
        <paper-icon-item class="mb-3">
          Order nr. ${order._id}<br />
          ${loadList(order)}
        </paper-icon-item>
        Total: €${totalWithTax(order)}
        <hr />
      `);
    }
  }

  return html`
    ${templates}
  `;
}

function loadList(data) {
  let templates = [];
  // load Orders
  if (data === false) {
    templates.push(html`
      <h4>
        No orders found.
      </h4>
    `);
  } else {
    for (const item of data.items) {
      templates.push(html`
        ${item.name} ${item.amount}
        €${Number(item.price).toFixed(2) * item.amount}<br />
      `);
    }
  }

  return html`
    ${templates}
  `;
}

function totalWithTax(data) {
  let total = 0;
  if (data) {
    for (let i of data.items) {
      if (i !== null) total += i.price * i.amount;
    }
  }

  return total;
}

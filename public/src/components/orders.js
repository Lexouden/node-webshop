import { LitElement, html, css } from "lit-element";

// Import external components
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item";

var templates = [];

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
          ${loadList(data)}
        </div>
      </div>
    </div>
  </div>
`;

function loadList(data) {
  // load Orders
  if (data === false) {
    templates.push(html`
      <h4>
        No orders found.
      </h4>
    `);
  } else {
    console.log(data);
    data.forEach(order => {
      // templates.push(html`
      //   <paper-icon-item>
      //   </paper-icon-item>
      // `);
    });
  }

  return html`
    ${templates}
  `;
}

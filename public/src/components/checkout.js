import { html } from "lit-html";

export const Checkout = () => html`
  <div class="input-group mb-3">
    <input
      class="form-control"
      type="text"
      placeholder="Firstname"
      id="firstname"
      required
    />
    <input
      class="form-control"
      type="text"
      placeholder="Lastname"
      id="lastname"
      required
    />
  </div>
  <div class="input-group mb-3">
    <input
      class="form-control"
      type="text"
      placeholder="Town/City"
      id="city"
      required
    />
    <input
      class="form-control"
      type="text"
      placeholder="Postal Code"
      id="postal-code"
      required
    />
    <input
      class="form-control"
      type="text"
      placeholder="Address"
      id="address"
      required
    />
  </div>
  <div class="input-group mb-3">
    <input
      class="form-control"
      type="text"
      placeholder="Country"
      id="country"
      required
    />
  </div>
  <div class="input-group">
    <div class="row">
      <div class="col-lg-12">
        <button
          class="btn btn-secondary float-right"
          id="payment"
          onclick="confirmOrder()"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  </div>
`;

import { html } from "lit-html";

// Register form html template
export const RegisterForm = () => {
  return html`
    <div
      class="modal fade"
      id="register"
      tabindex="-1"
      role="dialog"
      aria-labelledby="register"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="register-title">Register</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="register-modal">
            <form
              name="register"
              id="registerform"
              onsubmit="event.preventDefault(); registerUser()"
            >
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Firstname *"
                  name="Firstname"
                  required
                />
                <input
                  class="form-control"
                  type="text"
                  placeholder="Lastname *"
                  name="Lastname"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control"
                  type="email"
                  placeholder="E-mail *"
                  name="email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Username *"
                  name="username"
                  required
                />
                <input
                  class="form-control"
                  type="password"
                  placeholder="Password *"
                  name="password"
                  title="Password requires one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces."
                  required
                />
              </div>

              <button class="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};

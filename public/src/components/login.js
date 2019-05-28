import {
  LitElement,
  html,
  css
} from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-button/paper-button.js';
import {
  login
} from '../modules/socket.js';


class LoginElement extends LitElement {
  static get styles() { // Element css styling
    return css `
      :host {
        display: block;
        max-height: 600px;
        max-width: 400px;
        margin: 0 auto;
      }

      .white {
        background-color: white;
      }

      paper-input.login-input {
        --paper-input-container-input-color: white  ;
      }
    `
  }

  static get properties() {
    return {
      value: String
    };
  }

  handleClick() { // Handle the submit click
    var username = 'Backoffice';
    var password = 'B@ck0ff1c3';
    return login({
      username: username,
      password: password
    }, (user, callback) => {
      if (user === null && callback === false) {
        console.error('User does not exist.', 'Login failed!')
        // toastr.warning('User does not exist.', 'Login failed!');
      }
      if (callback === true) {
        console.info('Logged in succesfully')
        // toastr.success('Logged in succesfully', 'Success');
      }
    });
  }

  render() { // Render login form
    return html `
      <paper-material elevation="3">
        <div>
          <paper-input class="login-input" id="username" name="username" placeholder="Username" auto-validate></paper-input>
        </div>
        
        <div>
          <paper-input class="login-input" id="password" name="password" type="password" placeholder="Password" auto-validate></paper-input>
        </div>

        <div>
          <paper-button raised type="submit" class="white" @click="${this.handleClick}">Login</paper-button>
        </div>
      </paper-material>
    `
  }
}

customElements.define('login-element', LoginElement);
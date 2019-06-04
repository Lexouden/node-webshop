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
      username: String,
      password: String
    };
  }

  handleClick() { // Handle the submit click
    let username = document.querySelector("login-element").shadowRoot.querySelector("#username").shadowRoot.querySelector("#input-1 > input").value;
    let password = document.querySelector("login-element").shadowRoot.querySelector("#password").shadowRoot.querySelector("#input-2 > input[type=password]").value;

    return login({
      username: username,
      password: password
    }, (user, callback) => {
      if (user === null && callback === false) {
        console.error('User does not exist.', 'Login failed!')
        // toastr.warning('User does not exist.', 'Login failed!');
      }
      if (callback === true) {
        console.info('Logged in successfully');
        sessionStorage.setItem('user', JSON.stringify(user));
        // toastr.success('Logged in successfully', 'Success');
      }
    });
  }

  render() { // Render login form
    return html `
      <paper-material slot="dropdown-content" elevation="3">
        <div>
          <paper-input class="login-input" id="username" name="username" placeholder="Username" @value="{{username}}" auto-validate></paper-input>
        </div>
        
        <div>
          <paper-input class="login-input" id="password" name="password" type="password" placeholder="Password" @value="${this.password}" auto-validate></paper-input>
        </div>

        <div>
          <paper-button raised type="submit" class="white" @click="${this.handleClick}">Login</paper-button>
        </div>
      </paper-material>
    `
  }
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

customElements.define('login-element', LoginElement);
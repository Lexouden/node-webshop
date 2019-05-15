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
  static get styles() {
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

  handleClick() {
    var username = 'Dummy username';
    var password = 'dummypassword';
    return login(username, password)
  }

  render() {
    return html `
      <paper-material elevation="2">
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
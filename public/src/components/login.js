import {
  LitElement,
  html,
  css
} from 'lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-button/paper-button.js';


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

  render() {
    return html `
      <paper-material elevation="2">
        <div>
          <paper-input class="login-input" id="username" placeholder="Username"></paper-input>
        </div>
        
        <div>
          <paper-input class="login-input" id="password" type="password" placeholder="Password"></paper-input>
        </div>

        <div>
          <paper-button raised class="white" @click="${this.handleClick}">Login</paper-button>
        </div>
      </paper-material>
    `
  }
}

customElements.define('login-element', LoginElement);
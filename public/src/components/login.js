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
    let username = this.shadowRoot.getElementById('username').value;
    let password = this.shadowRoot.getElementById('password').value;

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
        setCookie('login', JSON.stringify(user), 5);
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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

customElements.define('login-element', LoginElement);
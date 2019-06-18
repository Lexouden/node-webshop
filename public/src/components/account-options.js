import { LitElement, html, css } from "lit-element";
import { login } from "../modules/socket.js";

// import sharedStyles from './shared-styles';

import "@polymer/paper-menu-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/communication-icons.js";
import "@polymer/paper-icon-button";
import "@polymer/paper-button";
import "@polymer/paper-item/paper-icon-item";
import "@polymer/paper-item";
import "@polymer/paper-input/paper-input";

class AccountOptions extends LitElement {
  static get styles() {
    return [
      css`
        [hidden] {
          display: none;
        }

        :host {
          display: block;
          --paper-menu-button-dropdown-background: var(
            --notification-dropdown-content-background,
            white
          );
          line-height: none;
        }
        paper-menu-button {
          padding: 0;
        }
        #account-link {
          display: none;
        }
        .logo {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        h3 {
          margin: 0 0 10px 0;
          font-weight: normal;
          font-size: 18px;
        }
        h4 {
          margin: 0;
          margin-top: 25px;
          font-weight: normal;
          font-size: 15.5px;
        }
        #login-content {
          color: black;
          width: 280px;
          padding: 30px 40px;
        }
        #options-content {
          color: black;
          width: 280px;
          padding: 0;
          width: 240px;
        }
        paper-icon-item {
          cursor: pointer;
        }
        #login-button {
          margin-top: 15px;
        }
        paper-button {
          width: 100%;
          margin: 0 0 10px 0;
          background: #007bff;
          color: white;
        }
        a {
          text-decoration: none;
          color: black;
        }
        footer {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        paper-button {
          padding: 12px 44px;
          font-size: 14px;
        }
        .underline {
          position: relative;
          cursor: pointer;
        }
        .underline::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          content: " ";
          background: black;
          width: 0px;
          height: 1px;
          transition: 0.115s ease-in-out;
          transition-property: width left;
        }
        .underline:hover::after {
          width: 100%;
          left: 0%;
        }
      `
    ];
  }

  render() {
    return html`
      <paper-menu-button
        horizontal-align="right"
        no-overlap
        ?hidden="${this._loggedIn}"
        id="login-dropdown"
      >
        <paper-icon-button
          icon="account-circle"
          slot="dropdown-trigger"
        ></paper-icon-button>
        <div id="login-content" slot="dropdown-content">
          <h3>Login</h3>
          <paper-input
            label="Username"
            id="username"
            @focus="${this._onFieldFocus}"
          ></paper-input>
          <paper-input
            label="Password"
            id="password"
            type="password"
            @focus="${this._onFieldFocus}"
          ></paper-input>
          <paper-button id="login-button" @click="${this._login}"
            >Login</paper-button
          >
          <footer>
            <a class="underline" page-id="register">Create account</a>
            <a class="underline" page-id="account-recovery">Forgot password?</a>
          </footer>
        </div>
      </paper-menu-button>
      <paper-menu-button
        horizontal-align="right"
        no-overlap
        ?hidden="${!this._loggedIn}"
        id="options-dropdown"
      >
        <paper-icon-button
          icon="account-circle"
          slot="dropdown-trigger"
        ></paper-icon-button>
        <div id="options-content" slot="dropdown-content" role="listbox">
          <paper-icon-item>
            <iron-icon icon="account-circle" slot="item-icon"></iron-icon>
            My account
          </paper-icon-item>
          <paper-icon-item>
            <iron-icon icon="history" slot="item-icon"></iron-icon>
            Order history
          </paper-icon-item>
          <paper-icon-item ?hidden="${!this._admin}">
            <iron-icon icon="business" slot="item-icon"></iron-icon>
            Back office
          </paper-icon-item>
          <paper-icon-item @click="${this._logout}">
            <iron-icon icon="exit-to-app" slot="item-icon"></iron-icon>
            Logout
          </paper-icon-item>
        </div>
      </paper-menu-button>
      <a page-id="login" ?hidden="${this._loggedIn || !this._compactLayout}">
        <paper-icon-button icon="account-circle"></paper-icon-button>
      </a>
    `;
  }

  _onFieldFocus() {}

  _login() {
    let username = this.shadowRoot.getElementById("username").value;
    let password = this.shadowRoot.getElementById("password").value;

    return login(
      {
        username: username,
        password: password
      },
      (user, callback) => {
        if (user === null && callback === false) {
          console.error("User does not exist.", "Login failed!");
        }
        if (callback === true) {
          console.info("Logged in successfully", this);
          setCookie("login", JSON.stringify(user), 5);
          this._loggedIn = true;
        }
      }
    );
  }

  _logout() {
    setCookie("login", null, 0);
    this._loggedIn = false;
  }

  static get properties() {
    return {
      _compactLayout: Boolean,
      _admin: Boolean,
      _accountOptionsOpened: Boolean,
      _loggedIn: Boolean
    };
  }

  constructor() {
    super();
    var login = document.cookie;
    if (login) {
      this._loggedIn = true;
    } else {
      this._loggedIn = false;
    }
  }

  toggle() {
    if (this._loggedIn) {
      this.shadowRoot.getElementById("options-dropdown").toggle();
    } else {
      this.shadowRoot.getElementById("login-dropdown").toggle();
    }
  }
  // stateChanged(state) {
  //   this._accountOptionsOpened = state.app.accountOptionsOpened;
  //   this._compactLayout = state.app.compactLayout;
  //   this._loggedIn = state.user.loggedIn;
  //   this._admin = state.user.isAdmin;
  //   this._loginErrors = state.user.loginErrors;
  //   this._registerErrors = state.user.registerErrors;
  // }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

window.customElements.define("account-options", AccountOptions);

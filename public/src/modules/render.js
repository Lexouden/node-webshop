import { render } from "lit-html";
import { Orders } from "../components/orders.js";
import { RegisterForm } from "../components/register.js";
import { orders } from "../modules/socket.js";

import "../components/orders.js";

export function renderOrders() {
  var user = JSON.parse(getCookie("login"));
  let order_container = document.getElementById("ordercontainer");

  orders(user._id, (data, callback) => {
    render(Orders(data), order_container);
    order_container.hidden = false;
    $("#orders").modal("toggle");
  });
}

export function renderRegister() {
  let register_container = document.getElementById("registercontainer");
  render(RegisterForm(), register_container);
  register_container.hidden = false;
  $("#register").modal("toggle");
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

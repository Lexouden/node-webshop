import { render } from "lit-html";
import { Cart } from "./components/cart.js";
import { Product } from "./components/product.js";
import { Category } from "./components/category.js";
import { Checkout } from "./components/checkout.js";
import { products, categories, checkout } from "./modules/socket.js";
import "./modules/socket.js";

var cart = $(".cart");
var checkoutbtn = $("#checkoutbtn");
cart.on("click", renderCart);
checkoutbtn.on("click", checkOut);

renderProducts();
renderCategories();

function renderProducts(category) {
  products(category, products => {
    $(".product").remove();
    render(Product(products), document.getElementById("products"));
  });
}

function renderCategories() {
  categories(categories => {
    render(Category(categories), document.getElementById("categories"));
  });
}

function renderCart() {
  var container = document.getElementById("cartcontainer");
  var container_content = container.innerHTML;

  container.hidden = false;

  if (container_content !== "") {
    if ($(".input-group")) {
      $(".input-group").hide();
    }
    let cartlist = $("cart-element > ul");
    let cartelement = $("cart-element");
    if (cartlist) {
      cartlist.remove();
      cartelement.remove();
      $("#cart-modal").append("<cart-element></cart-element>");
    }
    render(Cart(), document.getElementById("cartcontainer"));
    $("#shopcart").modal("toggle");
  } else {
    render(Cart(), document.getElementById("cartcontainer"));
    $("#cart-modal").append("<cart-element></cart-element>");
    $("#shopcart").modal("toggle");
  }
}

function checkOut() {
  $(".input-group").show();
  $("cart-element").remove();

  render(Checkout(cart), document.getElementById("cart-modal"));
}

function confirmOrder() {
  var shopcart = JSON.parse(sessionStorage.getItem("cart"));
  var login = JSON.parse(getCookie("login"));
  var login_id = login._id;

  var firstname = $("#firstname").val(),
    lastname = $("#lastname").val(),
    city = $("#city").val(),
    postal_code = $("#postal-code").val(),
    address = $("#address").val(),
    country = $("#country").val();

  if (login) {
    if (
      firstname !== "" &&
      lastname !== "" &&
      city !== "" &&
      postal_code !== "" &&
      address !== "" &&
      country !== ""
    ) {
      var order = {
        _id: guid(),
        fullname: `${firstname} ${lastname}`,
        city: city,
        zip: postal_code,
        address: address,
        country: country,
        items: shopcart.cart
      };
      checkout(order, login_id, (orders, callback) => {
        if (callback) {
          sessionStorage.removeItem("cart");
          setTimeout(() => {
            updateCartCount();
          }, 100);
          $("#shopcart").modal("toggle");
        }
      });
    } else {
      return alert("All checkout fields are required!");
    }
  } else {
    document.getElementsByTagName("account-options")[0].toggle();
    $("#shopcart").modal("toggle");
    setTimeout(() => {
      alert("Please log in before proceeding to payment.");
    }, 1);
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
}

window.renderProducts = renderProducts;
window.checkOut = checkOut;
window.confirmOrder = confirmOrder;

// Check for service worker
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load fast
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

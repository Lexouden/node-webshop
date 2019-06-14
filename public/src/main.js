import { render } from "lit-html";
import { Cart } from "./components/cart.js";
import { Product } from "./components/product.js";
import { Category } from "./components/category.js";
import { Checkout } from "./components/checkout.js";
import "./modules/socket.js";
import { products, categories, checkout } from "./modules/socket.js";

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
  var cart = JSON.parse(sessionStorage.getItem("cart"));
}

window.renderProducts = renderProducts;
// Check for service worker
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

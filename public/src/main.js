import { render } from "lit-html";
import { Cart } from "./components/cart.js";
import { Product } from "./components/product.js";
import { Category } from "./components/category.js";
import "./modules/socket.js";
import { products, categories } from "./modules/socket.js";

var cart = $(".cart");
cart.on("click", renderCart);

renderProducts();
renderCategories();

function renderProducts(category) {
  products(
    {
      category
    },
    products => {
      render(Product(products), document.getElementById("products"));
    }
  );
}

function renderCategories() {
  categories(categories => {
    render(Category(categories), document.getElementById("categories"));
  });
}

function renderCart() {
  var container_content = document.getElementById("cartcontainer").innerHTML;
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

// Check for service worker
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

// Generate random ID
export async function uuid() {
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

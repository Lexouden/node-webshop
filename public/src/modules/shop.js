var cartCount = 0,
  buy = $(".btn"),
  span = $(".number"),
  cart = $(".cart"),
  quickview = $(".quickviewContainer"),
  quickViewBtn = $(".quickview"),
  close = $(".quickviewContainer .close"),
  miniCartPrice;

buy.on("click", addToCart);
quickViewBtn.on("click", quickView);

close.on("click", function() {
  quickview.removeClass("active");
});

updateCartCount();

function quickView(btn) {
  var description = btn.dataset.description,
    header = btn.dataset.title,
    price = btn.dataset.price,
    quickViewHeader = $(".quickviewContainer .headline"),
    quickViewDescription = $(".quickviewContainer .description");
  clearTimeout(timeQuick);
  if (quickview.hasClass("active")) {
    quickview.removeClass("active");
    var timeQuick = setTimeout(function() {
      quickview.addClass("active");
    }, 300);
  } else {
    quickview.addClass("active");
  }

  quickViewHeader.text(header);
  quickViewDescription.text(description);
}

function addToCart(btn) {
  var productName = btn.dataset.title,
    price = Number(btn.dataset.price).toFixed(2),
    cart = JSON.parse(sessionStorage.getItem("cart"));

  if (cart) {
    var checkcart = cart.find(cart => cart.name === productName);

    if (checkcart) {
      checkcart.amount++;
    } else {
      cart.push({
        name: productName,
        amount: 1,
        price: price
      });
    }
  } else {
    cart = [];

    cart.push({
      name: productName,
      amount: 1,
      price: price
    });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function removeFromCart(btn, type) {
  var productName = btn.dataset.title,
    cart = JSON.parse(sessionStorage.getItem("cart"));

  if (cart) {
    var checkcart = cart.find(cart => cart.name === productName);
    var cartindex = cart.findIndex(cart => cart.name === productName);
    if (checkcart) {
      if (type === "remove") {
        cart.splice(cartindex, 1);
      } else {
        if (checkcart.amount <= 1) {
          cart.splice(cartindex, 1);
        } else {
          checkcart.amount--;
        }
      }
    }
  } else {
    cart = [];

    cart.push({
      name: productName,
      amount: 1,
      price: price
    });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCart(input) {
  var productName = input.dataset.title,
    cart = JSON.parse(sessionStorage.getItem("cart"));

  if (cart) {
    var checkcart = cart.find(cart => cart.name === productName);
    if (checkcart) {
      if (input.value < 1) {
        checkcart.amount = 1;
      } else {
        checkcart.amount = input.value;
      }
    }
  } else {
    cart = [];

    cart.push({
      name: productName,
      amount: 1,
      price: price
    });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  let cartlist = $("cart-element > ul");
  let cartelement = $("cart-element");
  if (cart) {
    cartCount = 0;
    cart.forEach(item => {
      cartCount = cartCount + Number(item.amount);
    });
  }

  if (cartlist) {
    cartlist.remove();
    cartelement.remove();
    $("#cart-modal").append("<cart-element></cart-element>");
  }

  span.text(cartCount);
  clearTimeout(time);
  if (span.hasClass("update")) {
    span.removeClass("update");
    span.addClass("updateQuantity");
    var time = setTimeout(function() {
      span.removeClass("updateQuantity");
      span.addClass("update");
    }, 700);
  } else {
    span.addClass("update");
  }
}

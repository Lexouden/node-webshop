var cartCount = 0,
  buy = $('.btn'),
  span = $('.number'),
  cart = $('.cart'),
  quickview = $('.quickviewContainer'),
  quickViewBtn = $('.quickview'),
  close = $('.quickviewContainer .close'),
  miniCartPrice;

buy.on('click', addToCart);
quickViewBtn.on('click', quickView);

close.on('click', function () {
  quickview.removeClass('active');
});

updateCartCount();

function quickView(btn) {
  var description = btn.dataset.description,
    header = btn.dataset.title,
    price = btn.dataset.price,
    quickViewHeader = $('.quickviewContainer .headline'),
    quickViewDescription = $('.quickviewContainer .description');
  clearTimeout(timeQuick);
  if (quickview.hasClass('active')) {
    quickview.removeClass('active');
    var timeQuick = setTimeout(function () {
      quickview.addClass('active');
    }, 300);
  } else {
    quickview.addClass('active');
  }

  quickViewHeader.text(header);
  quickViewDescription.text(description);
}

function addToCart(btn) {
  var self = $(this),
    productName = btn.dataset.title,
    miniCartNames = $('.products'),
    names = $('.names'),
    price = Number(btn.dataset.price).toFixed(2),
    cart = JSON.parse(sessionStorage.getItem('cart'));

  if (cart) {
    var checkcart = cart.find(cart => cart.name === productName);

    if (checkcart) {
      checkcart.amount += 1
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

  sessionStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();

  btn.classList.add('ok');
  var timeOk = setTimeout(function () {
    btn.classList.remove('ok');
  }, 1000);
}

function updateCartCount() {
  let cart = JSON.parse(sessionStorage.getItem('cart'));
  if (cart) {
    cartCount = 0;
    cart.forEach(item => {
      cartCount += item.amount;
    });
  }

  span.text(cartCount);
  clearTimeout(time);
  if (span.hasClass('update')) {
    span.removeClass('update');
    span.addClass('updateQuantity');
    var time = setTimeout(function () {
      span.removeClass('updateQuantity');
      span.addClass('update');
    }, 700);
  } else {
    span.addClass('update');
  }
}
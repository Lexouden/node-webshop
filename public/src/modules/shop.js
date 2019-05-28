var cartCount = 0,
  buy = $('.btn'),
  span = $('.number'),
  cart = $('.cart'),
  quickview = $('.quickviewContainer'),
  quickViewBtn = $('.quickview'),
  close = $('.quickviewContainer .close'),
  minicart = [],
  totalPrice = [],
  miniCartPrice;

buy.on('click', addToCart);
quickViewBtn.on('click', quickView);
cart.on('click', showMiniCart);
close.on('click', function () {
  quickview.removeClass('active');
});

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

function showMiniCart() {
  $('.mini').toggleClass('visible');
}

function addToCart(btn) {
  var self = $(this),
    productName = btn.dataset.title,
    miniCartNames = $('.products'),
    names = $('.names'),
    price = Number(btn.dataset.price).toFixed(2),
    priceInt = parseInt(price);
  var cart = JSON.parse(sessionStorage.getItem('cart'));

  totalPrice.push(priceInt);
  miniCartPrice = Number(totalPrice.reduce(function (a, b) {
    return a + b
  })).toFixed(2);
  $('.miniprice').text('Total amount: $' + miniCartPrice);
  minicart.push(productName);

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

  lastProduct = minicart[minicart.length - 1];
  miniCartNames.text('Your cart lines: ');
  names.append('<p>' + lastProduct + '</p>');

  cartCount++;
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
  if (cartCount == 1) {
    cart.toggleClass('icon-basket icon-basket-loaded');
  }

  btn.classList.add('ok');
  var timeOk = setTimeout(function () {
    btn.classList.remove('ok');
  }, 1000);
}
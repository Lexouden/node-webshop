import {
  html
} from 'lit-html';

export const Webshop_Template = () => html `
  <nav>
    <div class="mini">
      <p class="products">Empty</p>
      <p class="names"></p>
      <p class="miniprice"></p>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
    </ul>

    <div class="cart fa fa-shopping-cart">
      <span class="number">1</span>
    </div>
  </nav>
  <div class="container" id="categories">

  </div>
  <div class="container" id="products">

  </div>
  <div class="quickviewContainer">
    <div class="close"></div>
    <h2 class="headline"></h2>
    <p class="description"></p>
    <img src="" alt="">
    <img src="" alt="">
    <img src="" alt="">
  </div>
  </div>
`
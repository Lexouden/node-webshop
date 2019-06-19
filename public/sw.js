/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [{
    "url": "css/style.css",
    "revision": "19b66fca3b322980789a04d85c4860ae"
  },
  {
    "url": "gfx/icon.png",
    "revision": "0ff9cf338971675f95f8772f4ab7e207"
  },
  {
    "url": "index.html",
    "revision": "ca0e498fd8f0e498733d654085812dbf"
  },
  {
    "url": "src/components/cart.js",
    "revision": "fc891ca687a2838a30e8e9db8ed57ed0"
  },
  {
    "url": "src/components/login.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "src/main.js",
    "revision": "de63ad71273aabf2acfe48a43e3dcd9e"
  },
  {
    "url": "src/modules/shoppingcart.js",
    "revision": "825dc27db7a35a5c110bd732155a771b"
  },
  {
    "url": "src/modules/socket.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
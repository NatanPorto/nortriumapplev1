'use strict';
/* PWA: registra o service worker (uso offline). Só funciona em HTTPS. */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(e => console.error('Service worker:', e)));
}

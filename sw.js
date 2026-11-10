/* NORTRIUM — service worker: guarda o app no aparelho para abrir offline.
   Troque VERSAO sempre que publicar uma atualização, para o iPhone baixar os arquivos novos. */
const VERSAO = 'nortrium-pwa-1';
const ARQUIVOS = ['./', 'index.html', 'manifest.webmanifest', 'css/app.css', 'privacypolicy.html',
  'js/core.js', 'js/financas.js', 'js/fin-extras.js', 'js/agenda.js', 'js/treinos.js', 'js/saude.js', 'js/estudos.js',
  'js/curso.js', 'js/trabalho.js', 'js/hoje.js', 'js/intro.js', 'js/nuvem.js', 'js/app.js', 'js/pwa.js',
  'img/logo.png', 'img/icon-180.png', 'img/icon-192.png', 'img/icon-512.png', 'img/icon-maskable-512.png', 'video/intro.mp4'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// o Safari pede o vídeo em pedaços (Range); responde a partir do cache
async function comRange(req, resp) {
  const buf = await resp.arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  const ini = m && m[1] ? +m[1] : 0, fim = m && m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(ini, fim + 1), { status: 206, statusText: 'Partial Content', headers: {
    'Content-Type': resp.headers.get('Content-Type') || 'video/mp4', 'Content-Range': `bytes ${ini}-${fim}/${buf.byteLength}`, 'Content-Length': String(fim - ini + 1) } });
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;          // Google Drive etc. passam direto
  e.respondWith((async () => {
    const c = await caches.open(VERSAO);
    let r = await c.match(req, { ignoreSearch: true, ignoreVary: true });
    if (!r && req.mode === 'navigate') r = await c.match('index.html');
    if (r) {
      if (req.headers.get('range')) return comRange(req, r);
      return r;
    }
    try { return await fetch(req); } catch (err) { return new Response('Sem conexão.', { status: 503 }); }
  })());
});


export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1420, hash: '30e0e28c76ffe8067785469ab24fa5c871a51a67c3fd7846b7fe681593cee69c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1104, hash: '51d51a838b30a44b3699132eb0f9cc43f3b66e7c1db2dbcb7d05b678fd804ffa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28962, hash: '4ebbb22fb4fc363cffd6b07f8aad3d62a7e701ce826d9902f64810ed137cae9f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};

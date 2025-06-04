
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/cv-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/cv-app"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1376, hash: '2bdb003918de1293e1c4ac0e2777ca8971cc1c53873f80abec7f40328d29763c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1060, hash: '27dff7351433349200c3e00b87a1ae78b5b6a5661cfde9b07f89467da373c248', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 44306, hash: '0ca447e6c96df5b4fbdd7c8d5e9855a61251854915c6c0fe0ec906caf3315667', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};


export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/CvGenerador/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/CvGenerador"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1381, hash: '1c6cd24257fc6401164b62a99c63f7a255644474139cbb72e609330e288103ea', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1065, hash: '78e37a59be83810a25e3f66862a0e8120f0b713a3089fbdba5e9576a1ec98372', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 44311, hash: 'ff70d38f394857f21a1b35f5cc7906544976cac73184271144cd5482c9e45c80', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};

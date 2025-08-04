
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
    'index.csr.html': {size: 1381, hash: '96df43f48e672c7d14056f748da06c1393faeb518ec9cd71b1ef647a6fdd32fe', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1065, hash: '69b9e0f368e5f8c07cc8b08eb0a2c6a864c8ca06d5f40aa9ec4bda141949b855', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 44311, hash: '16b89d511c22165f68a8037dbc747090266181e6da33857c357d920eda3fed63', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};


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
    'index.csr.html': {size: 1381, hash: 'b07b6daeb374a6465b2981862872b3fe94ea41585e53093cdf3bc8ee0203c8a5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1065, hash: 'bc568b6a2b4d7bb445c7f72f9fdf0bc656f5d08dd1f3e388c66364c3f8054525', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 44311, hash: '16b89d511c22165f68a8037dbc747090266181e6da33857c357d920eda3fed63', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};


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
    'index.csr.html': {size: 1432, hash: 'de31d445c5e2a092c5cee48f52fc8851f56f28bbf695ee1d64b41b3ddf938ec4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1116, hash: '6eebb81fd56c54bf478b69fc2374c986692bd7ebee382701a8919ecd870292ef', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28974, hash: '8fa751ae41db2002cc1d8d815c1eef53945a8ec8423be51f1afc4d0e4300502f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};


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
    'index.csr.html': {size: 1381, hash: '82ad3d94197e895893a9ac3fdcb814ea5eec8ec5d38ce182659201583358a7eb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1065, hash: 'cf9976342a1409449ddfa11d5d3555c0fcd19320dce33dbe6c17b17a2fc7e3bf', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 49092, hash: '0f8ace6bd5d75de00d16f15168eedee654f92e34797b9852679ab66602e57d8a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6VZPZ37R.css': {size: 977, hash: 'm0wQMwTgNhs', text: () => import('./assets-chunks/styles-6VZPZ37R_css.mjs').then(m => m.default)}
  },
};

const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/files', proxy({ target: 'http://localhost:8080', changeOrigin: true, }));
  app.use('/forecast', proxy({ target: 'https://api.darksky.net', changeOrigin: true,}));
};
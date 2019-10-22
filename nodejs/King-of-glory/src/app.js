'use esversion：6';
const http = require('http');
const Router = require('./router');
const bindRender = require('./utils/utils.js');

const server = http.createServer();
server.on('request', (req, res) => {
  bindRender(res);
  Router(req, res);
});

server.listen(3000, function() {
  console.log('Run in localhost:3000 ');
});
module.exports = server;

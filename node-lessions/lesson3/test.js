const https = require('https');

var options = {
  hostname: 'myportal.vtc.edu.hk',
  port: 443,
  path: '/wps/portal',
  method: 'GET',
  secureProtocol: 'TLSv1_method'
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', (e) => {
  console.error(e);
});
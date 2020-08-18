const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const postData = querystring.stringify({
  content: 'Hello World!111',
});
// const postData = 'Hello World!233';

const options = {
  host: 'localhost',
  port: 8081,
  path: '/?filename=x.html',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  // res.setEncoding('utf8');
  // res.on('data', (chunk) => {
  //   console.log(`BODY: ${chunk}`);
  // });
  // res.on('end', () => {
  //   console.log('No more data in response.');
  // });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

let readStream = fs.createReadStream('./package/cat.jpg');
readStream.pipe(req);

// Write data to request body
req.write(postData);
req.end();

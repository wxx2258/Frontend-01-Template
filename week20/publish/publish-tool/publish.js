const http = require('http');
const fs = require('fs');
let archiver = require('archiver');
const childProcess = require('child_process');

function publishFile(token, { server }) {
  let packName = './package';

  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
      access_token: token,
      'Content-Type': 'application/octet-steam',
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  var archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.directory(packName, false);

  archive.pipe(req);

  archive.finalize();

  archive.on('end', () => {
    req.end();

    console.log('publish successfully');
    server.close();
  });
}

let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
const url = `https://github.com/login/oauth/authorize?client_id=Iv1.3e2b9de280e464e4&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`;
childProcess.exec(`open ${url}`);

const server = http.createServer((request, response) => {
  const token = request.url.match(/token=([^&]+)/)[1];
  console.log('server');
  // let url = `https://github.com/login/oauth/access_token?${params}`;
  publishFile(token, { server });
});
server.listen(8080);

// fs.stat(filename, (error, stat) => {

/** 
const options = {
  host: 'localhost',
  port: 8081,
  path: '/?filename=' + 'package.zip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-steam',
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

var archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

archive.directory(packName, false);

archive.pipe(req);

archive.finalize();

archive.on('end', () => {
  req.end();

  let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
  const url = `https://github.com/login/oauth/authorize?client_id=Iv1.3e2b9de280e464e4&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`;
  childProcess.exec(`open ${url}`);
});
*/

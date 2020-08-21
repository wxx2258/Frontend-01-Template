const http = require('http');
const fs = require('fs');
let archiver = require('archiver');

let packName = './package';

// fs.stat(filename, (error, stat) => {

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
});

// let filename = './package/cat.jpg';

// fs.stat(filename, (error, stat) => {
//   const options = {
//     host: 'localhost',
//     port: 8081,
//     path: '/?filename=cat.jpg',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/octet-steam',
//       'Content-Length': stat.size,
//     },
//   };

//   const req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   });

//   req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
//   });

//   // Write data to request body
//   let readStream = fs.createReadStream(filename);
//   readStream.pipe(req);
//   readStream.on('end', () => {
//     req.end();
//   });
// });

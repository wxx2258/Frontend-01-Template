const http = require('http');
const fs = require('fs');
const path = require('path');
// console.log(__dirname, path.join(__dirname, '/server.js'));
// console.log(fs.readFileSync(path.join(__dirname, '/server.js')));
const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(req.headers);
    res.setHeader('X-foo', 'sd')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end(fs.readFileSync(path.join(__dirname, '/test.html')));
    // res.end(fs.readFileSync(path.join(__dirname, '/test-flex.html')));
    res.end(fs.readFileSync(path.join(__dirname, '/test-flex-teacther.html')));
});
server.listen(8088);
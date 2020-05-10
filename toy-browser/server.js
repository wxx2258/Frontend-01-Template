const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.writeHead('X-foo', 'sd')
    res.end('ok');
});
server.listen(8088);
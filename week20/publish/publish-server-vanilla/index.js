const http = require('http');
const https = require('https');
const fs = require('fs');
const unzip = require('unzipper');
const { isArray } = require('util');

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }
  if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, {
      'content-Type': 'text/plain',
    });
    res.end('not found');
    return;
  }

  const options = {
    url: 'user',
    hostname: 'api.github.com',
    port: 443,
    method: 'GET',
    headers: {
      'User-Agent': 'tou-publish-server',
      Authorization: 'token' + req.headers.access_token,
    },
  };
  const request = https.request(options, (response) => {
    let body = '';
    response.on('data', (d) => {
      // let result = d.toString();
      body += d.toString();
    });
    response.on('end', () => {
      let user = JSON.parse(body);
      // console.log(user);
      // 权限检查

      // 上传数据
      let writeStream = unzip.Extract({ path: '../server/public/' });
      req.pipe(writeStream);

      req.on('end', () => {
        console.log('数据上传成功');
        res.writeHead(200, {
          'content-Type': 'text/html',
        });
        res.end('okay');
      });
    });
  });
  request.on('error', (err) => {
    console.error(err);
  });
  request.end();
  return;
});

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  let state = 'abc123';
  let client_id = 'Iv1.3e2b9de280e464e4';
  let client_secret = 'b31b23e53db3f80f2ec5bd804337f3153fb1ba53';
  let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  let url = `https://github.com/login/oauth/access_token?${params}`;
  const options = {
    url: url,
    hostname: 'github.com',
    port: 443,
    method: 'POST',
  };

  const request = https.request(url, options, (response) => {
    // console.log('response: ', response);
    response.on('data', (d) => {
      let result = d.toString().match(/access_token=([^&]+)/);
      if (!result) {
        res.writeHead(200, {
          'content-type': 'text/htmk',
        });
        res.end('error');
      }

      let token = isArray(result) && result[1];
      res.writeHead(200, {
        access_token: token,
        'content-type': 'text/html',
      });
      res.end(
        `<a href="http://localhost:8080/publish?token=${token}">publish</a>`
      );
    });
  });
  request.on('error', (err) => {
    console.log('err: ', err);
  });
  request.end();
}

server.listen(8081);

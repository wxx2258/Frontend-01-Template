/** 

https://github.com/login/oauth/authorize?client_id=Iv1.3e2b9de280e464e4&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=read%3Auser&state=123abc

code=39145b0ff8faa6554ba3&state=123abc

https://github.com/login/oauth/access_token

access_token=d58b60fd6a9ffb03850b67184b4fd1bf7adac613&expires_in=28800&refresh_token=r1.d1864b2898fffb09b6b3a5693d58c37d5a4e9215278ce816c9168a03e8a13b08b33ff5cd94b2e309&refresh_token_expires_in=15897600&scope=&token_type=bearer


d58b60fd6a9ffb03850b67184b4fd1bf7adac613


*/

{
  let code = 'ec904313f046d0438134';
  let state = 'abc123';
  let client_id = 'Iv1.3e2b9de280e464e4';
  let client_secret = 'b31b23e53db3f80f2ec5bd804337f3153fb1ba53';
  let redirect_uri = encodeURIComponent('http://localhost:8080');
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  let xhr = new XMLHttpRequest();

  xhr.open(
    'Post',
    `https://github.com/login/oauth/access_token?${params}`,
    true
  );
  xhr.send(null);

  xhr.addEventListener('readystatechange', function (event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
    }
  });
}

{
  let xhr = new XMLHttpRequest();

  xhr.open('Get', `https://api.github.com/user`, true);
  xhr.setRequestHeader(
    'Authorization',
    'token d58b60fd6a9ffb03850b67184b4fd1bf7adac613'
  );
  xhr.send(null);

  xhr.addEventListener('readystatechange', function (event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
    }
  });
}

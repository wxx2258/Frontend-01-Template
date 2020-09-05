# 每周总结可以写在这里
## phantomJS 无头浏览器
https://phantomjs.org

* 冒烟测试
* UI测试

## eslint

## OAuth 
https://developer.github.com/v3/

### OAuth api
> doc: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
* https://github.com/login/oauth/authorize?...
  * client_id
  * redirect_uri
  * login


### hooks
* 查看文件权限
  * ls -l
* 给文件添加权限
  * chomod +x
``` shell
#!/usr/bin/env node 
const process = require('process');

console.log('hook is running');

process.exit(1);

```

web hook

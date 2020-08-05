# 每周总结可以写在这里
## 组件
### TabPanel组件
``` js
let panel = (
  <TabPanel>
    <span title="title 1">this is content1</span>
    <span title="title 2">this is content2</span>
    <span title="title 3">this is content3</span>
    <span title="title 4">this is content4</span>
  </TabPanel>
);
```

### listView组件
``` javascript
let list = (
  <ListView data={data}>
    {(record) => (
      <figure>
        <img src={record.url} />
        <figCaption>{record.title}</figCaption>
      </figure>
    )}
  </ListView>
);
```

### Css-loader

``` javascript
let css = require('css');

module.exports = function (source, map) {
  var styleSheet = css.parse(source);
  let name = this.resourcePath.match(/([^/]+).css$/)[1];

  for (const rule of styleSheet.stylesheet.rules) {
    rule.selectors = rule.selectors.map((selector) =>
      selector.match(new RegExp(`^.${name}`))
        ? selector
        : `.${name} ${selector}`
    );
    // console.log(rule);
  }

  return `
  let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))};
  document.documentElement.appendChild(style);
  `;
};

```
## 工具链
* 初始化
* 调试/开发
* 测试
* 发布

### yeoman
* 用户收集信息
* npm的操作
* 模板的操作


#### console toolkit
https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal
https://github.com/heapwolf/cdir/blob/223fe0039fade4fad2bb08c2f7affac3bdcf2f89/cdir.js#L24

相关知识：
* node readline
* terminal cursor handler


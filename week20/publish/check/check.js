const url = 'http://localhost:8000/';
// const url = 'http://baidu.com/';
var page = require('webpage').create();
page.open(url, function (status) {
  console.log('Status: ' + status);
  if (status === 'success') {
    console.log('rendering');
    // page.render('./baidu.png');
    var body = page.evaluate(function () {
      var toString = function (pad, element) {
        var children = element.childNodes;
        var childrenString = '';
        for (var i = 0; i < children.length; i++) {
          childrenString += toString('    ' + pad, children[i]) + '\n';
        }
        // var name = element.tagName || element.textContent;
        var name;
        if (element.nodeType === Node.TEXT_NODE) {
          name = '#text' + JSON.stringify(element.textContent);
        }
        if (element.nodeType === Node.ELEMENT_NODE) {
          name = element.tagName;
        }
        return pad + name + (children.length ? '\n' + childrenString : '');
      };
      return toString('', document.body);
    });
    console.log(body);
  }
  phantom.exit();
});

let css = require('css');

module.exports = function (source, map) {
  var styleSheet = css.parse(source);

  let name = this.resourcePath.match(/([^/]+).css$/)[1];
  console.log('name: ', name);

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

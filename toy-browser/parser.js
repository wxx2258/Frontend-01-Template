const EOF = Symbol("EOF"); // EOF: End of File

function data(c) {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    return ;
  } else {
    return data;
  }
}

function tagOpen(c) {
  if (c==='/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else {
    return;
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z]$/)) {
    return tagName;
  } else if(c === '>') {
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '>') {
    return data;
  } else if ( c === '=') {
    return ;
  } else {
    return ;
  }
}

function selfClosingStartTag(c) {
  if (c === ">") {
    // currentT
    return data;
  } else if (c === 'EOF') {

  } else {

  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else if (c === ">") {

  } else if (c === EOF) {

  } else {
    
  }
}


// function tagOpen(c) {
//   if (c==='/') {
//     return tagName;
//   } else if (c.match(/x/)) {
//     return
//   } else {
//     return
//   }
// }

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (const c of html) {
    state = state(c);
  }
  state = state(EOF);
}
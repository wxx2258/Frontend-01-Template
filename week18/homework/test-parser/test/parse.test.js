var { parseHTML } = require('../src/parser');
var assert = require('assert');
const { count } = require('console');

// function hasPro

it('parse a single element ', () => {
  let doc = parseHTML('<div></div>');
  let div = doc.children[0];

  assert.equal(div.tagName, 'div');
  assert.equal(div.children.length, 0);
  assert.equal(div.type, 'element');
  assert.equal(div.attributes.length, 2);
});

it('parse a upper element ', () => {
  let doc = parseHTML('<DIV></DIV>');
  let div = doc.children[0];

  assert.equal(div.tagName, 'DIV');
  assert.equal(div.children.length, 0);
  assert.equal(div.type, 'element');
  assert.equal(div.attributes.length, 2);
});

it('parse a single element with text context', () => {
  let doc = parseHTML('<div>hello</div>');
  let text = doc.children[0].children[0];

  assert.equal(text.content, 'hello');
  assert.equal(text.type, 'text');
});

it('tag mismatch', () => {
  try {
    let doc = parseHTML('<div></vid>');
  } catch (error) {
    assert.equal(error.message, "Tag start end doesn't match!");
  }
});

it('text with <', () => {
  let doc = parseHTML('<div>a < b</div>');
  let text = doc.children[0].children[0];

  assert.equal(text.content, 'a < b');
  assert.equal(text.type, 'text');
});

it('with attribute property', () => {
  let doc = parseHTML('<div id=a class="cls" data="abc" ></div>');
  let div = doc.children[0];
  let count = 0;
  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
      return;
    }
    if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cls');
      return;
    }
    if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
      return;
    }
  }
  assert.ok(count === 3);
});

it('selfClosingStartTag', () => {
  let doc = parseHTML('<img />');
  let img = doc.children[0];
  for (const attr of img.attributes) {
    if (attr.name === 'isSelfClosing') {
      assert.equal(attr.value, true);
      return;
    }
  }
  assert.ok(false);
});

it('with double quoted property', () => {
  let doc = parseHTML('<div id=a class="cls" data="abc"></div>');
  let div = doc.children[0];
  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
      return;
    }
    if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cls');
      return;
    }
    if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
      return;
    }
  }
  assert.ok(count === 3);
});

it('selfblocktag with double quoted property ', () => {
  let doc = parseHTML('<div id=a class="cls" data="\'abc"/>');
  let div = doc.children[0];
  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
      return;
    }
    if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cls');
      return;
    }
    if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
      return;
    }
  }
  assert.ok(count === 3);
});

it('script', () => {
  let content = `
    <div>abcd</div>
<span>x</span>
/script>
<script>
<
</
</s
</sc
</scr
</scri
</scrip
</script `;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];

  assert.equal(text.content, content);
  assert.equal(text.type, 'text');
});

it('with no value property', () => {
  let doc = parseHTML('<div disabled></div>');
});

it('with no value property', () => {
  let doc = parseHTML('<div disabled id></div>');
});

it('befor attr name', () => {
  let doc = parseHTML("<div        class='><div>");
});

it('befor attr name', () => {
  let doc = parseHTML('<div        class=><div>');
});

it('signle block attr', () => {
  let doc = parseHTML("<div class=''a'><div>");
});

it('signle block attr', () => {
  let doc = parseHTML('<div id=a></div>');
});

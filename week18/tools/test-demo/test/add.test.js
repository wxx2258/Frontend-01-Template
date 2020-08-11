var { add } = require('../dist/add');
var assert = require('assert');

describe('add', () => {
  it('add(3,4) equal 7', function () {
    assert.equal(add(3, 4), 7);
  });
});

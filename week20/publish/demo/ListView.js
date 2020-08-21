import { createElement, Wrap, Text } from './createElement';

import { Timeline, Animation } from './animation.js';
import { ease, liner } from './cubicBezier';

export class ListView {
  constructor(params) {
    this.children = [];
    this.attributes = new Map();
    // this.data = null
    this.root = document.createElement('div');
    this.state = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
    this[name] = value;
  }
  appendChild(child) {
    this.children.push(child);
  }
  get style() {
    return this.root.style;
  }
  mountTo(parent) {
    this.render().mountTo(parent);
  }
  addEventListener() {
    this.root.addEventListener(...arguments);
  }
  getAttribute(name) {
    return this[name];
  }

  render() {
    let data = this.getAttribute('data');
    return (
      <div class="list-view" style="width: 300px">
        {data.map(this.children[0])}
      </div>
    );
  }
}

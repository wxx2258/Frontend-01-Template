import { createElement, Wrap, Text } from './createElement';

import { Timeline, Animation } from './animation.js';
import { ease, liner } from './cubicBezier';

export class Panel {
  constructor(params) {
    this.children = [];
    this.attributes = new Map();
    // this.data = null
    this.root = document.createElement('div');
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
  render() {
    return (
      <div class="panel">
        {/* <h1>{this.attributes.get('title')}</h1> */}
        <h1 style="background-color:lightgreen; width: 300px; margin: 0">
          {this.title}
        </h1>

        <div style="border: 1px solid lightgreen; width: 300px; min-height: 300px;">
          {this.children}
        </div>
      </div>
    );
  }
}

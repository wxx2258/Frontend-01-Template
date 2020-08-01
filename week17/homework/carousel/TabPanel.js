import { createElement, Wrap, Text } from './createElement';

import { Timeline, Animation } from './animation.js';
import { ease, liner } from './cubicBezier';

export class TabPanel {
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
  // getAttribute(name) {
  //   console.log('name111: ', name);
  //   return this[name];
  // }

  select(i) {
    for (const view of this.childViews) {
      view.style.display = 'none';
    }
    this.childViews[i].style.display = '';

    for (const view of this.titleViews) {
      view.classList.remove('selected');
    }
    this.titleViews[i].classList.add('selected');
    // this.titleView.innerText = this.childViews[i].title;
  }

  render() {
    this.childViews = this.children.map((child) => (
      <div style="width: 300px; min-height: 300px;">{child}</div>
    ));
    this.titleViews = this.children.map((child, i) => (
      <span class="tab-title-h" onClick={() => this.select(i)}>
        {child.getAttribute('title') || ' '}
      </span>
    ));
    setTimeout(() => {
      this.select(0);
    }, 0);

    return (
      <div
        class="tab-panel"
        style="border: 1px solid lightgreen; width: 300px;"
      >
        <h1 style=" width: 300px; margin: 0">
          {/* {this.title} */}
          {this.titleViews}
        </h1>

        <div>{this.childViews}</div>
      </div>
    );
  }
}

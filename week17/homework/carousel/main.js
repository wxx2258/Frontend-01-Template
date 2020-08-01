// import "./foo"
import { createElement, Wrap, Text } from './createElement';
import { Carousel } from './Carousel';
// import { Panel  } from './Panel';
import { TabPanel } from './TabPanel';
import { ListView } from './ListView';

let carousel = (
  <Carousel
    data={[
      'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
      'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
      'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
      'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
    ]}
  ></Carousel>
);

let panel = (
  <TabPanel>
    <span title="title 1">this is content1</span>
    <span title="title 2">this is content2</span>
    <span title="title 3">this is content3</span>
    <span title="title 4">this is content4</span>
  </TabPanel>
);

let data = [
  {
    url:
      'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    title: '蓝猫',
  },
  {
    url:
      'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    title: '猫2',
  },
  {
    url:
      'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    title: '猫3',
  },
  {
    url:
      'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
    title: '猫4',
  },
];
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

carousel.mountTo(document.body);
list.mountTo(document.body);
panel.mountTo(document.body);

window.panel = panel;
// // let component = <Div id="a" class="b">
// //     <Div></Div>
// //     <Div></Div>
// //     <Div></Div>
// // </Div>
// // component.id= "hhh"
// // component.mountTo(document.getElementsByTagName("body")[0])
// // component.setAttribute("id",'333')

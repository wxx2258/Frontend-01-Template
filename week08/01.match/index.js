import Tokenizer from "css-selector-tokenizer";

function match(selector, element) {
  // 不考虑 ， 分割的情况，非该函数应该的职能，应在外部处理好传进来
  let result = true;
  const selectorParse = Tokenizer.parse(selector);
  console.log('selectorParse: ', selectorParse);
  let currentElement = element;
  if (selectorParse.type === 'selectors' && selectorParse.nodes.length >= 1) {
    const selectorArr = selectorParse.nodes[0].nodes;
    const len = selectorArr.length;
    let spaceFlag = false;

    for (let index = len - 1; index >= 0; index--) {
      const item = selectorArr[index];

      if (spaceFlag) {
        switch (item.type) {
          case 'element':
            let tempres = false;
            // 没有tagName，说明已经到了docuemnt最顶层了
            while(currentElement.tagName && !tempres) {
              // console.log('currentElement: ', currentElement, tempres);
              tempres = currentElement.tagName.toLowerCase() === item.name.toLowerCase();
              currentElement = currentElement.parentNode;
            }
            result = tempres;
            break;
          case 'id':
            break;
          // .....
          default:
            break;
        }
      }else {
        switch (item.type) {
          // 处理简单选择器
          case 'element':
            result = currentElement.tagName.toLowerCase() === item.name.toLowerCase();
            break;
          case 'id':
            result = currentElement.getAttribute('id') === item.name;
            break;
          case 'class':
            result = currentElement.getAttribute('class') === item.name;
            break;
          
          case 'attribute':
            break;
          case 'pseudo-element':
            break;
          case 'pseudo-class':
            break;
          // 处理连接符
          case 'spacing':
            currentElement = currentElement.parentNode;
            spaceFlag = true;
            break;
          case '>':
            break;
          case '~':
            break;
          case '+':
            break;
          default:
            break;
        }
      }
      
      // console.log('result: ', item, result);
      if (!result) {
        
        // 已经出现不匹配情况，提早退出
        break;
      }
    }
  } else {
    result = false;

  }

  return result;
}


console.log('* match div #id.class', match("div.div #id.class:hover::after[id=id]", document.getElementById("id")));

document.write('* match div #id.class : ' + match("div #id.class", document.getElementById("id")));
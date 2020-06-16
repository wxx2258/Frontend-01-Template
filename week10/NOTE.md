
[TOC]
## DOM
### 导航操作
* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling

实时变化，如果dom修改就实时修改。

### 修改操作
* appendChild
* insertBefore
* removeChild
* replaceChild

当操作dom树二次插入其他dom树的时候，浏览器会自动将这个dom树从原来的父级dom移除掉。

### 高级操作
* compareDocumentPosition 是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点的结构是否完全相同
* isSameNode 检查两个节点是否是一个同一个节点。
* cloneNode 复制一个节点，如果参数为true，则进行深拷贝

### event
* 捕获与冒泡
    * 先捕获后冒泡

* * *

## Range API
```
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
var range = document.getSelection().getRangeAt(0)
```

* API(辅助)
    * range.setStartBefore
    * range.setEndBefore
    * range.setStartAfter
    * range.setEndAfter
    * range.selectNode
    * range.selectNdoeContents
    * range.extractContents()
    * range.insertNode

## CSS Dom
> `document.styleSheets`

* styleSheets
* CssStyleSheets
    * cssRules
    * insertRule
    * removeRule
### Rule
* CssStyleRule
### getComputedStyle
* getComputedStyle
    * window.getComputedStyle(elt, pesudoEit)
        * el 想要获取的元素
        * pseudoElt 可选，伪元素

## window Handle
通过`window.open`打开的子window，父级window可以操作它

###  scroll
* scrollBy
* scrollTo
* scrollHeight
* scrollTop
* scrollLeft
* ……

### getClientRects
### getBoundingClientRect
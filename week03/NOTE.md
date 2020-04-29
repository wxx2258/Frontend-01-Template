[TOC]
# 重学JavaScript|表达式
## Expression
### MemberExpression
* MemberExpression
    * a.b
    * a[b]
    * foo`string`
    * super.b
    * super[b]
    * new.target
    * new Foo()
``` JavaScript
function class1(s) {
    console.log(s);
}
function class2(s) {
    console.log("2", s);
    return class1;
}
new class2()()
new new class()
```

> memberExpression 返回的是 reference 类型
* Reference
    * Object
    * key

``` JavaScript
class Reference {
    constructor(object, property) {
        this.object = object;
        this.property = property;
    }
}
```

### CallExpression
* Call
    * foo()
    * super()
    * foo()['b']
    * foo().b
``` JavaScript
class foo {
    constructor() {
        this.b = 1;
    }
}
console.log('new foo()', new foo()['b']);
```
### left Expression & right Expression

### update
* update
    * a++ 
    * a--
    * ++a
    * --a

```
var a = 1,b=1,c=1;

a
++
b
++
c // 只有b，c自增
```

### unary 单目运算符
* unary
    * delete a.b
    * void foo()
    * typeof a
    * + a
    * - a
    * ~ a （反转被操作数的位。）
    * ! a
    * await a

### Exponental
* `**`
### Multiplicative
* `*/%`
### shift
* << >> >>>
### Relationship
* < > <= >= 
* instanceof 
* in
### Equiality
### Bitwise
* & ^ |
### Logical
* &&
* ||
短路逻辑

### conditional
* ? :
短路逻辑

## 类型转换
### 装箱
```
string Boolean Number Symbol
```
### 拆箱
```
1 + {}

1 + {valueOf() {return 2}}

1 + {valueOf() {return 2}, toString() {return '2'}} // valueOf优先于toString

symbol.toPrimitive // 优先级更高，钩子自己接管

1 + {[symbol.toPrimitive]() {return {}}, valueOf() {return 2}, toString() {return '2'}} // valueOf优先于toString
```

### StringToNumber

### NumberToString

## JavaScript中有几种加法
1. number加法
2. string加法

## 疑问
* [+In, ?Yield, ?Await] 是什么意思？

# 重学JavaScript ｜ 语句
## 前言
* Grammar
    * 简单语句
    * 组合语句
    * 声明
* Runtime 
    * completion Record
    * Lexical Enviorment

### completion Record
* [[type]]: normal,break,continue, reutrn,or throw
* [[value]]: Types
* [[target]]: label

## 简单语句
* ExpressionStatement
* EmptyStatement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakStatement
* ReturnStatement

## 复合语句
### BlockStatement
```
* [[type]]: normal
* [[value]]: --
* [[target]]: --
```

一旦出现了type非normal的语句，则block中断，离开block； 
### iteration
* while
* do while
* for
* for  in
* for of


### 标签、循环、break、continue
* LabelledStatement
* IterationStatement
* ContinueStatement
* BreakStatemen
* SwitchStatement

```
* [[type]]: break continue
* [[value]]: --
* [[target]]: label
```

### try
```
try {

} catch() {

} finally {

}

* [[type]]: return,throw
* [[value]]: --
* [[target]]: label
```

### 声明
* FunctionDeclaration
* GeneratorDeclaration
* AsyncFunctionDeclaration
* AsyncGeneratorDeclaration
* VariableStatement
* ClassDeclaration
* LexicalDeclaration
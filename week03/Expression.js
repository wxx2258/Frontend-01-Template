class foo {
    constructor() {
        this.b = 1;
    }
}
console.log('new foo()', new foo()['b']);

var a = 1,b=1,c=1;

a
++
b
++
c // 只有b，c自增

let t = 1;

console.log(~t);

for (let i = 0; i < 10; i++) {
    var button = document.createElement('button');
    document.body.appendChild(button);
    button.innerHTML = i;
    void function(i) {
        button.onClick = function() {
            console.log(i);
        }
    }(i)
}


1 + {}

1 + {valueOf() {return 2}}

1 + {valueOf() {return 2}, toString() {return '2'}} // valueOf优先于toString

symbol.toPrimitive // 优先级更高，钩子自己接管

1 + {[symbol.toPrimitive]() {return {}}, valueOf() {return 2}, toString() {return '2'}} // valueOf优先于toString


// 简单语句
// a = 1 + 2;
// ;
// debugger;
// throw a;
// continue label1;
// break label2;
// return;

// 复合语句
// {
//     a: 1
// }

// for (let p of [1,2,3]) {
//     console.log(p)
// }

// function *g() {
//     yield 0;
//     yield 1;
//     yield 4;
// }
// for(let p of g()) {
//     console.log(p);
// }

// [Symbol.iterator]

// asyncGeneratorFunction
// function sleep(d) {
//     return new Promise(resolve=> {
//         setTimeout(resolve, d);
//     })
// }
// async function* foo() {
//     var i = 0;
//     while(true) {
//         yield i++;
//         await sleep(1000);
//     }
// }
// void async function() {
//     var g = foo();
//     for await(let e of g) {
//         console.log(e);
//     }
// }()

var x = 0;
function foo() {
    var o = {x:1};
    x = 2;
    with(o) {
        var x = 3
    }
    console.log(x);
    console.log(o);
}
foo();
console.log(x);
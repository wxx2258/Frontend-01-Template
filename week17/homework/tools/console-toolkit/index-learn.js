// var tty = require('tty');
// var ttys = require('ttys');
// var rl = require('readline');

// var stdin = ttys.stdin;
// var stdout = ttys.stdout;
// var write = function write(s) {
//   stdout.write(s);
// };

// write('hello world\n');
// write('\033[1A');
// write('wwxxx\n');

/** 分割线 */

// const readline = require('readline');
// const { resolve } = require('path');
// const { rejects } = require('assert');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function ask(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       // TODO：将答案记录在数据库中。
//       resolve(answer);
//       // console.log(`感谢您的宝贵意见：${answer}`);
//       rl.close();
//     });
//   });
// }

// void (async function () {
//   console.log(await ask('你如何看待 Node.js 中文网？'));
// })();

/** 分割线 */
var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');
var stdin = ttys.stdin;
var stdout = ttys.stdout;

var stdin = process.openStdin();

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// stdin.on('data', function (key) {
//   // ctrl-c
//   if (key === '\u0003') {
//     process.exit();
//   }
//   process.stdout.write(key.toString().charCodeAt(0).toString());
// });

function getChar() {
  return new Promise((resolve) => {
    stdin.once('data', function (key) {
      resolve(key);
    });
  });
}

function up(n = 1) {
  stdout.write('\033[' + n + 'A');
}
function down(n = 1) {
  stdout.write('\033[' + n + 'B');
}
function right(n = 1) {
  stdout.write('\033[' + n + 'C');
}
function left(n = 1) {
  stdout.write('\033[' + n + 'D');
}

void (async function () {
  stdout.write('which framework do you want choice\n');
  const answer = await select(['vue', 'react', 'angular']);
  stdout.write('you selected ' + answer + '\n');
  process.exit();
})();

async function select(choices) {
  let selected = 0;
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    if (i === selected) {
      stdout.write('[x]' + choice + '\n');
    } else {
      stdout.write('[ ]' + choice + '\n');
    }
  }
  up(choices.length);
  right();
  while (true) {
    let char = await getChar();

    if (char === '\u0003') {
      process.exit();
      break;
    }
    if (char === 'w' && selected > 0) {
      stdout.write(' ');
      left();
      selected--;
      up();
      stdout.write('x');
      left();
    }
    if (char === 's' && selected < choices.length - 1) {
      stdout.write(' ');
      left();
      selected++;
      down();
      stdout.write('x');
      left();
    }
    if (char === '\r') {
      down(choices.length - selected);
      left();
      return choices[selected];
    }
    // console.log(char.split('').map((c) => c.charCodeAt(0)));
  }
}

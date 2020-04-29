
function converstringToNumber(string, x = 10) {
    // 其他情况考虑 边界考虑
    console.log('string.indexOf(: ', string.indexOf('e') > 0);
    if (x===10 && string.indexOf('e') > 0) {
        const eArr = string.split('e');

        if (eArr[1] > 0 || eArr[1] < 0) {
            string = +(eArr[0] + '') * Math.pow(10, eArr[1]);
            string += '';
        }
    }
    if (!/^(0\.?|0?\.\d+|[1-9]\d*\.?\d*?)$/.test(string)) {
        return NaN;
    }
    if (+x < 2 || +x > 36) {
        // x只允许传2-36
        throw Error('只允许转换2-36进制!');
    }
    
    
    var chars = string.split('');
    var number = 0;
    var i = 0;
    // 处理整数部分
    while(i < chars.length && chars[i] !== '.') {
        number = number * x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i ++;
    }
    // 处理小数部分
    var fraction = 1;
    if (chars[i] === '.' && i !== chars.length - 1) {
        i ++;
        while(i < chars.length) {
            fraction = fraction / x;
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
            i ++;
        }
    } else {
        fraction = 0;
    }

    return number;
}

console.log(converstringToNumber('10.0122')) // 10.0122
console.log(converstringToNumber('10.0122', 3)) // 3.2098765432098766
console.log(converstringToNumber('01')) // NaN
console.log(converstringToNumber('10.')) // 10
console.log(converstringToNumber('10e2'))
console.log(converstringToNumber('10e-2'))
// console.log(converstringToNumber('10.0122', 37)) // error
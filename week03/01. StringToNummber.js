
function converstringToNumber(string, x = 10) {
    // 其他情况考虑
    var chars = string.split('');
    var number = 0;
    var i = 0;
    // 处理整数部分
    while(i < chars.length && chars[i] !== '.') {
        number = number * x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i ++;
    }
    if (chars[i] === '.') {
        i ++;
    }
    // 处理小数部分
    var fraction = 1;
    while(i < chars.length) {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i ++;
    }
    fraction = fraction / x;

    return number + fraction;
}

console.log(converstringToNumber('10.0122'))
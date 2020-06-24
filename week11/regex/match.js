console.log('abc'.match(/a(b)c/));
console.log('abc'.match(/a(b)|c/g));

// 特性一，匹配结果可以捕获括号内容，并分组，有利于获取
console.log('[a=value]'.match(/\[([^=]+)=([^\]]+)\]/))
// 使用?: 不捕获
console.log('[a=value]'.match(/\[(?:[^=]+)=(?:[^\]]+)\]/))



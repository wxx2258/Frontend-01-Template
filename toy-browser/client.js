// const net = require('net');

// class Request {

// }
// class Response {

// }

const net = require('net');
const client = net.createConnection({
    host: '127.0.0.1',
    port: 8088
}, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    client.write('你好世界!\r\n');
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('已从服务器断开');
});
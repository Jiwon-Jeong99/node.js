"use strict";
exports.__esModule = true;
// const http = require('http');
var http = require("http");
var listener = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // plain
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
};
http
    .createServer(listener)
    .listen(8080)
    .on('listening', function () {
    console.log('8080번 포트에서 서버 대기 중입니다.');
})
    .on('request', function (req, res) {
    console.log('-------- Request In ---------');
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    req.on('data', function (chunk) {
        // request data(chunk) + request header :== socket
        // independent
        console.log('test');
        console.log(Buffer.concat([chunk]).toString());
    });
    console.log('-------- Request Out ---------');
})
    .on('connection', function (socket) {
    socket.on('data', function (data) {
        console.log('-------- Socket In --------');
        console.log(Buffer.concat([data]).toString());
        console.log('-------- Socket Out --------');
    });
    // Buffer(socket) 내용을 직접 접근할 수 없다. (encapsulated)
    console.log('-------- Connected In ---------');
    console.log(socket.connecting); // false
    console.log(socket.readyState);
    console.log(socket.address());
    console.log(socket.writableLength);
    console.log(socket.timeout);
    console.log(socket.localAddress, socket.localPort, socket.localFamily);
    console.log(socket.remoteAddress, socket.remotePort, socket.remoteFamily);
    console.log('-------- Connected Out ---------');
});

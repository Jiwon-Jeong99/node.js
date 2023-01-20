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
    console.log(req);
    console.log(res);
});

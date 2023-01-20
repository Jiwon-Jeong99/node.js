"use strict";
exports.__esModule = true;
// const http = require('http');
var http = require("http");
// typeof IncomingMessage - req의 타입, typeof ServerResponse - res의 타입
var listener = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
};
http
    .createServer(listener)
    .listen(function () {
    console.log('8080번 포트에서 서버 대기중입니다!');
});

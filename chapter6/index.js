"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var app = express(); //app에 express 할당
app.set('port', process.env.PORT || 3000); //process.env 객체에 PORT 속성이 있으면 그 값, 없으면 3000번
app.get('/', function (req, res) {
    // res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(app.get('port'), function () {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
app.set('port', process.env.PORT || 3000);
app.use(function (req, res, next) {
    console.log('모든 요청에 다 실행');
    next(); //다음 미들웨어로 넘어가는 함수
});
app.get('/', function (req, res, next) {
    console.log('get / 요청에서만 실행');
    next();
}, function (req, res) {
    throw new Error('에러는 에러 처리 미들웨어로 간다');
});
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});
app.listen(app.get('port'), function () {
});

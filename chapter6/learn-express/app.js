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

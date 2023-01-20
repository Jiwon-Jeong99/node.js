// const http = require('http');
import * as http from 'http';
import { RequestListener } from 'http'; //얘는 typescript
import { IncomingMessage, ServerResponse } from 'http'; //class는 js 문법이니까 따로 분리

// typeof IncomingMessage - req의 타입, typeof ServerResponse - res의 타입
const listener: RequestListener<typeof IncomingMessage, typeof ServerResponse> = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}

http
.createServer(listener)
// 포트번호가 없어도 됨. 대신 127.0.0.1:8080에서 안 열림
.listen(() => {
    console.log('8080번 포트에서 서버 대기중입니다!');
})
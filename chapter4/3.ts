// const http = require('http');
import * as http from 'http';
import { RequestListener } from 'http';
import { IncomingMessage, ServerResponse } from 'http';

const listener: RequestListener<typeof IncomingMessage, typeof ServerResponse> = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // plain
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}

http
.createServer(listener) 
.listen(8080)
.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
})
.on('request', (req, res) => {
    console.log('-------- Request In ---------');
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    // request body라고 생각
    req.on('data',(chunk) => { 
        // request data(chunk) + request header :== socket
        // independent
        console.log('test');
        console.log(Buffer.concat([chunk]).toString());
    });
    console.log('-------- Request Out ---------');
})
.on('connection', (socket) => {
    socket.on('data', (data)=> {
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
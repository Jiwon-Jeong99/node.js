import * as http from 'http';
import { promises as fs } from 'fs';
import * as path from 'path';

const users: { [key: string]: any } = {}; // 데이터 저장용

http
    .createServer(async (req, res) => {
        try {
            if (req.method === 'GET') { // HTML 호스팅
                if (req.url === '/') {
                    const data = await fs.readFile(path.join(__dirname, '2-rest.html'));
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end(data);
                }
                else if (req.url === '/users') {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(JSON.stringify(users));
                }

                try { // '/'이 아니면
                    const data = await fs.readFile(path.join(__dirname, req.url!));
                    return res.end(data);
                } catch (err) {
                    // do nothing
                    // => 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
                }
            } else if (req.method === 'POST') {
                if (req.url === '/user') {
                    let body = ''; //입력한 값
                    req.on('data', (data) => { // 요청의 body를 stream 형식으로 받음
                        body += data;
                    });
                    
                    return req.on('end', () => { // 요청의 body를 다 받은 후 실행됨
                        console.log('POST 본문(Body):', body);

                        const { name } = JSON.parse(body);
                        const id = Date.now();
                        users[id] = name;

                        res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end('등록 성공');
                    });
                }
            } else if (req.method === 'PUT') {
                if (req.url!.startsWith('/user/')) { //startswith은 시작을 해당 문자열로 하는지 불리언으로 반환
                    let body = ''; //새로 바뀐 이름
                    req.on('data', (data) => { // 요청의 body를 stream 형식으로 받음
                        body += data;
                    });

                    return req.on('end', () => { // 요청의 body를 다 받은 후 실행됨
                        console.log('PUT 본문(Body):', body);

                        const key = req.url!.split('/')[2];
                        users[key] = JSON.parse(body).name;

                        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                        return res.end(JSON.stringify(users, null, 4));
                    });
                }
            } else if (req.method === 'DELETE') {
                if (req.url!.startsWith('/user/')) {
                    const key = req.url!.split('/')[2];
                    delete users[key];

                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end(JSON.stringify(users, null, 4));
                }
            }

            res.writeHead(404);
            return res.end('NOT FOUND');
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    })
    .listen(8080, () => { console.log('8080번 포트에서 서버 대기 중입니다'); });
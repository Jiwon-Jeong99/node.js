import WebSocket from "ws";

export const websocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    //웹 소켓 연결 시
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", (message) => {
      //클라이언트로부터 메세지 수신 시
      console.log(message.toString());
    });
    ws.on("error", (error) => {
      //에러 시
      console.log(error);
    });
    ws.on("close", () => {
      //연결 종료 시
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      //3초마다 클라이언트로 메세지 전송
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메세지를 보냅니다.");
      }
    }, 3000);
  });
};

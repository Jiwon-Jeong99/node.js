import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as dotenv from "dotenv";

dotenv.config();

const app = express(); //app에 express 할당
app.set("port", process.env.PORT || 3000); //process.env 객체에 PORT 속성이 있으면 그 값, 없으면 3000번

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use((req, res, next) => {
  console.log("모든 요청에 다 실행");
  next(); //다음 미들웨어로 넘어가는 함수
});
app.get(
  "/",
  (req, res, next) => {
    console.log("get / 요청에서만 실행");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 간다");
  }
);

app.use((err, req, res, next) => {
  //에러처리 미들웨어는 매개변수가 err, req, res, next로 네 개여야 한다. 안쓰더라도
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

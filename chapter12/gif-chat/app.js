//packages
import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

//modules
import indexRouter from "./routes/index.js";
import { webSocket } from "./socket.js"; //export만 하면 구조분해할당 해줘야함. 선택해서 내보낼 수 있으니 선택해서 불러와야 함.

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("port", process.env.PORT || 8010);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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
  })
);

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.statue(err.status || 500);
  res.render("error");
});

//웹 소켓에 서버 연결
const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

webSocket(server);

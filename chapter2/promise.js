const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});

// 이전 then의 return 값을 다음 then의 매개변수로 넘긴다.
promise
  .then((message) => {
    //성공한 경우 실행
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })
  .catch((error) => {
    //실패한 경우 실행
    console.error(error);
  })
  .finally(() => {
    //끝나고 무조건 실행
    console.log("무조건");
  });

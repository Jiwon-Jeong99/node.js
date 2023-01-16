// function f() {} 함수선언문
var sayNode = function () {
  console.log("Node");
}; //함수표현식
var es = "ES";
const oldObject = {
  sayJS: function () {
    //함수표현식 constructor o 
    console.log("JS");
  },
  sayNode, //constructor o
  visual() {}, //메소드 constructor x
};
oldObject[es + 6] = "Fantastic";

// oldObject.sayNode(); //Node
// oldObject.sayJS(); //JS
// console.log(oldObject.sayNode); //sayNode라는 함수객체
// console.log(oldObject.sayNode()); //Node undefined
// console.log(oldObject.sayJS); //sayJS라는 함수객체
// console.log(oldObject.sayJS()); // JS undefined-> return을 안해줘서 undefined 반환
// console.log(oldObject.ES6); //Fantastic
// const d = new oldObject.sayJS(); //JS
// const v = new oldObject.sayNode(); //Node
// console.log(d); //sayJS{}
// console.log(v); //sayNode{}

// new oldObject.visual();
// new oldObject.visual;
const oh = new oldObject.visual;
console.log(oh);


const string = "abc";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      keuy: "value",
    },
  },
};
console.time('전체 시간');
console.table([{name:'제로',birth:1999},{name:'jiwon',birth:1999}]);

console.dir(obj,{colors:false,depth:2})
console.dir(obj, {colors:true, depth:1});
if (true) {
  var x = 3;
}
console.log(x);

if (true) {
  const y = 3;
}
try {
  console.log(y);
} catch(err) {
    console.error(err)
}
console.log(this);

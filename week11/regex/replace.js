
"abc".replace(/a(b)c/, function(str, $1) {
  console.log(str, $1)
  return $1 + $1;
})
console.log("abc".replace(/a(b)c/, "$1$1"))
console.log("abc".replace(/a(b)c/, "$$1$$1"))
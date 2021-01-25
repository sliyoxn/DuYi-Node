let i = 0;
console.time();
function test() {
  i++;
  if (i < 1000) {
    setTimeout(test);
  } else {
    console.timeEnd();
  }
}

test();

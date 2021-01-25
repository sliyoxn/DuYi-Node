const fs = require("fs");
const path = require("path");
// 你可以使用相对路径，但是在传递时很容易出问题，所以最好先转化成绝对路径
const filename = path.resolve(__dirname, "./myfiles/1.txt");

// 异步读取，因为读取文件的速度很慢，所以为了CPU能在它读取时能处理别的事情，就使用回调函数的方式来运行读取后要做的事情
fs.readFile(filename, "utf-8", (err, content) => {
    console.log("异步读取：", content);
});

// 当然，如果你想同步读取也行
// Sync函数是同步的，会导致JS运行阻塞，极其影响性能
const content = fs.readFileSync(filename, "utf-8");
console.log("同步读取：",content);

// 另外，fs还有promise的调用方式
async function test() {
  const content = await fs.promises.readFile(filename, "utf-8");
  console.log("promise读取：",content);
}

test();
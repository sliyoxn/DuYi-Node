const fs = require("fs");
const path = require("path");

const filename = path.resolve(__dirname, "./myfiles/2.txt");

// 异步写入
fs.writeFile(filename, "这是文件内容", {
    flag: "w" // 默认写入方式，覆盖
}, function (err, content) {
    console.log(err, content);
})
// 同步写入
fs.writeFileSync(filename, "文件内容");

async function test() {
    // 使用promise的方式
    await fs.promises.writeFile(filename, "阿斯顿发发放到发", {
        flag: "a" //追加内容
    });
    // 也可以写入一个buffer
    const buffer = Buffer.from("abcde", "utf-8");
    await fs.promises.writeFile(filename, buffer);
    console.log("写入成功");
}

//
// test();

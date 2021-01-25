const fs = require("fs");
const path = require("path");

async function copy(from, to) {
    console.log("开始复制");
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);
    rs.on("data", chunk => {
        //读到一部分数据
        const flag = ws.write(chunk);
        if (!flag) {
            // 表示下一次写入，会造成背压
            rs.pause(); // 暂停读取
        }
    });

    ws.on("drain", () => {
        // 可以继续写了
        rs.resume();
    });

    rs.on("close", () => {
        //写完了
        ws.end(); //完毕写入流
        console.log("复制完成");
    });
}

copy(path.resolve(__dirname, "./temp/data.txt"), path.resolve(__dirname, "./temp/data-copy.txt"));

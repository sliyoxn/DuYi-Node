const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:filename", (req, res) => {
    const absolutePath = path.resolve(
        __dirname,
        "../../resources",
        req.params.filename
    );
    console.log(absolutePath);
    // 第一个参数是下载路径，第二个参数是默认文件名
    // 另外，如果请求头中有range，就只会读取对应部分的内容(流传输嘛), 这样就可以断点续传了
    res.download(absolutePath, req.params.filename);
});

module.exports = router;

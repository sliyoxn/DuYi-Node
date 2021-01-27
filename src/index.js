// index.js
const express = require("express");
const path = require("path");
// 创建一个express应用
const app = express();
const port = 5555;
const staticRoot = path.resolve(__dirname, "../public");
const cookieParser = require("cookie-parser");
// 当请求时，会根据请求路径(req.path(如果使用了use绑定中间件，req.baseUrl就是绑定时的路径, 也叫基路径, req.path就是全路径去掉基路径后的路径))，
// 从指定的目录中寻找是否存在该文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
// 如果不存在文件，则直接移交给后续的中间件处理
// 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
app.use("/static", express.static(staticRoot));
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));
// 解析 application/json 格式的请求体
app.use(express.json());
// 解析cookie
app.use(cookieParser());
// CORS
app.use(require("./middleware/cors"));
app.use("/uploadFile", require("./api/upload"));
app.use("/download", require("./api/download"));
// express会建立一个请求映射表，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
// 配置请求映射的方式：app.请求方法("请求路径", 处理函数)
// req和res都是被express封装过后的对象
// 你可以通过next把控制权交给下一个中间件
// 如果在最后一个中间件中都没有处理res，express会响应404并结束请求
// 如果已经处理（调用了res.end）, 后续中间件依旧会执行，但是后续不能再处理，否则会报错
app.get("/data/:id", (req, res, next) => {
    // 获取请求信息
    console.log("请求头", req.headers);
    console.log("请求路径", req.path);
    console.log("query", req.query);
    console.log("params", req.params);
    console.log("cookie", req.cookies);
    res.cookie("token", "abc123", {
        path: "/",  // 路径
        domain: "localhost", // 域名
        maxAge: 7 * 24 * 3600 * 1000, //毫秒数
    });
    res.send({
        name : "SakuraSnow"
    });
});

app.post("/data/:id", (req, res, next) => {
    console.log("head", req.headers)
    console.log("query", req.query);
    console.log("params", req.params);
    console.log("body", req.body);
    res.send({
        name : "Snow"
    })
})

app.get("/error", (req, res, next) => {
    throw new Error("something wrong")
})

app.use('*', (req, res) => {
    res.status(404).send({
        code: 404,
        success: false,
        data: '',
        msg: 'the directory you request is not exist in the server'
    })
})

app.use("*", (err, req, res, next) => {
    console.error(err);
    res.status(500).send({
        code: 500,
        success: false,
        data: '',
        msg: err.toString()
    })
})

app.listen(port, () => {
    console.log(`server listen on ${port}`);
});

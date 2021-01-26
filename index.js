// index.js
const express = require("express");
// 创建一个express应用
const app = express();
const port = 5555;

// express会建立一个请求映射表，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
// 配置请求映射的方式：app.请求方法("请求路径", 处理函数)
// req和res都是被express封装过后的对象
app.get("/data/:id", (req, res, next) => {
    console.log("handler0")
    // 获取请求信息
    console.log("请求头", req.headers);
    console.log("请求路径", req.path);
    console.log("query", req.query);
    console.log("params", req.params);

    // 请求移交给下一个中间件
    // next()

    // 另外你可以使用下面的方式抛出错误
    // express会寻找后续的错误处理中间件，然后把错误传入
    // 如果没有，后续的中间件都会全部被跳过
    // throw new Error("rua");
    next(new Error("rua"));
});

app.get("/data/:id", (req, res, next) => {
    console.log("handler1")
    res.setHeader("a", "123");
    next()
})
app.get("/data/:id", (req, res, next) => {
    console.log("handler2")
    res.setHeader("b", "456");
    next()
});
app.get("*", (err, req, res, next) => {
    console.log("接收到错误", err);
    res.status(500);
    res.send("服务器错误");
    // next();
})
app.get("/data/:id", (req, res, next) => {
    console.log("handler3")
    res.send({
        name : "SakuraSnow"
    });
    // 如果在最后一个中间件中都没有处理res，express会响应404并结束请求
    // 如果已经处理（调用了res.end）, 后续中间件依旧会执行，但是后续不能再处理，否则会报错
})

// 匹配任何get请求
app.get("*", (req, res) => {
    console.log("abc");
    res.send({
        name : "Snow"
    })
});


app.listen(port, () => {
    console.log(`server listen on ${port}`);
});

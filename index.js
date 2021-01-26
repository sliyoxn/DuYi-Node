// index.js
const express = require("express");
// 创建一个express应用
const app = express();
const port = 5555;

// express会建立一个请求映射表，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
// 配置请求映射的方式：app.请求方法("请求路径", 处理函数)
// req和res都是被express封装过后的对象
app.get("/data/:id", (req, res) => {

    // 获取请求信息
    console.log("请求头", req.headers);
    console.log("请求路径", req.path);
    console.log("query", req.query);
    console.log("params", req.params);

    // 响应
    // send会在内部调用end方法
    res.setHeader("a", "123");
    res.setHeader("b", "456");
    res.send({
        name : "SakuraSnow"
    });
    // 重定向, 这里的end和http模块里的end是一样的意思，标志消息体的结束
    // res.status(302).header("location", "https://baidu.com").end();
    // res.status(302).location("https://baidu.com").end();
    // res.redirect(302, "https://baidu.com");

});

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

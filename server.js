const http = require("http");
const url = require("url");

function handleReq(req) {
    console.log("接收到请求");
    const urlobj = url.parse(req.url);
    console.log("请求路径", urlobj);
    console.log("请求方法", req.method);
    console.log("请求头", req.headers);
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString("utf-8");
    });
    req.on("end", () => {
        console.log("请求体", body);
    });
}

const server = http.createServer((req, res) => {
    handleReq(req);
    res.setHeader("a", "1");
    res.setHeader("b", "2");
    res.setHeader("content-type", "application/json")
    res.statusCode = 200;
    res.write(JSON.stringify({
        name : "SakuraSnow"
    }));
    res.end();
});

server.listen(9000);

server.on("listening", () => {
    console.log("server listen 9000");
});

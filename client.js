const http = require("http");
const request = http.request(
    "http://service.picasso.adesk.com/v1/vertical/vertical",
    {
        method: "GET"
    },
    resp => {
        console.log("服务器响应的状态码", resp.statusCode);
        console.log("服务器响应头", resp.headers);
        let result = "";
        // 收到服务器响应的数据进行拼接
        resp.on("data", chunk => {
            result += chunk.toString("utf-8");
        });
        // 服务器响应完了
        resp.on("end", chunk => {
            console.log(JSON.parse(result));
        });
    }
);
// request.write(); // 发送请求体，但是get请求没有请求体，这里就不写了
request.end();  // 表示请求体结束

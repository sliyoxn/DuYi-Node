let set = new Set(["http://localhost:9000", "http://localhost:5555"])
module.exports = function (req, res, next) {
    // 预检请求
    if (req.method.toLowerCase() === "options") {
        res.header(
            `Access-Control-Allow-Methods`,
            req.headers["access-control-request-method"]
        );
        res.header(
            `Access-Control-Allow-Headers`,
            req.headers["access-control-request-headers"]
        );
    }
    // 简单请求
    if ("origin" in req.headers && set.has(req.headers.origin)) {
        res.header("access-control-allow-origin", req.headers.origin);
    }
    // 告诉浏览器允许跨域携带cookie
    res.header("Access-Control-Allow-Credentials", true);
    next();
}
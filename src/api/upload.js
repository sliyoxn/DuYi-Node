const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    // 用于存储文件
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/upload"));
    },
    // 生成要存储的文件的文件名
    filename: function (req, file, cb) {
        // 时间戳-6位随机字符.文件后缀
        const timeStamp = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        const filename = `${timeStamp}-${randomStr}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({
    storage,
    limits: {
        // 限制文件上传的大小
        fileSize: 1024 * 1024,
    },
    // 验证扩展名
    fileFilter(req, file, cb) {
        //验证文件后缀名
        const extname = path.extname(file.originalname);
        const whitelist = [".jpg", ".gif", ".png"];
        if (whitelist.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error(`your ext name of ${extname} is not support`));
        }
    },
});

router.post("/", upload.single("img"), (req, res) => {
    console.log("body", req.body);
    console.log("file", req.file);
    // req.file.filename是生成的文件名
    // req.file.fieldname是在form-data中的文件名，但是框架会自动处理form-data中的文件，所以很少用
    const url = `/static/upload/${req.file.filename}`;
    res.send({
        code: 0,
        msg: "",
        src: url,
    });
});

module.exports = router;

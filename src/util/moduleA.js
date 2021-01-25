console.log("当前模块路径：", __dirname);
console.log("当前模块文件：", __filename);
exports.a = 1;
module.exports.b = 2;
module.exports.c = 3
this.d = 4;
console.log(exports, this, module.exports);
console.log(this === exports, this === module.exports);

const fs = require("fs");
const path = require("path");
const dirname = path.resolve(__dirname, "./myfiles/");

async function test() {
    const paths = await fs.promises.readdir(dirname);
    console.log(paths);
}

test();

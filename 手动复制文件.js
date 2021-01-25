const fs = require("fs");
const path = require("path");

async function copy(fromFilename, toFilename) {
    try {
        const buffer = await fs.promises.readFile(fromFilename);
        await fs.promises.writeFile(toFilename, buffer);
        return null;
    }catch (e) {
        // console.log(e);
        throw e;
    }
}

async function test() {
    try {
        await copy(path.resolve(__dirname, "./myfiles/1.jpeg"), path.resolve(__dirname, "./myfiles/1.copy.jpeg"))
    }catch (e) {
        console.log(e);
    }
}

test();

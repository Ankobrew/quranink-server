"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const const_1 = require("./const");
const mainFolderName = "ffmpeg";
const timingFolderName = "timing/alqatami";
let timeDiff = 0;
function createDirectory() {
    try {
        if (!fs_1.default.existsSync(mainFolderName)) {
            fs_1.default.mkdirSync(mainFolderName);
        }
    }
    catch (err) {
        console.error(err);
    }
}
createDirectory();
const data = fs_1.default.readFileSync(`${timingFolderName}/001.txt`, "utf8");
const arr = data.split("\r\n");
for (let index = 0; index < const_1.verseCount[0]; index++) {
    if (index == 0) {
        fs_1.default.writeFileSync(`${mainFolderName}/input1.txt`, `file 'images/1/img00${index + 1}.png'\n`);
        timeDiff = (parseFloat(arr[index]) - timeDiff) / 1000;
        fs_1.default.appendFileSync(`${mainFolderName}/input1.txt`, `duration ${timeDiff}\n`);
    }
    else {
        fs_1.default.appendFileSync(`${mainFolderName}/input1.txt`, `file 'images/1/img00${index + 1}.png'\n`);
        timeDiff = (parseFloat(arr[index]) - timeDiff) / 1000;
        fs_1.default.appendFileSync(`${mainFolderName}/input1.txt`, `duration ${timeDiff}\n`);
    }
    if (index == const_1.verseCount[0] - 1) {
        fs_1.default.appendFileSync(`${mainFolderName}/input1.txt`, `file 'images/1/img00${index + 1}.png'\n`);
    }
}
console.log("File is created successfully.");
//# sourceMappingURL=createvideo.js.map
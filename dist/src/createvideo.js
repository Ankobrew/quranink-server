"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const const_1 = require("./const");
const mainFolderName = "ffmpeg";
const timingFolderName = "timing/alqatami";
let timeDiff = 0.0;
function addLeadingZero(value) {
    if (value < 10) {
        return "00" + value.toString();
    }
    else if (value < 100) {
        return "0" + value.toString();
    }
    else {
        return value.toString();
    }
}
function createDirectory(folderName) {
    try {
        if (!fs_1.default.existsSync(folderName)) {
            fs_1.default.mkdirSync(folderName);
        }
    }
    catch (err) {
        console.error(err);
    }
}
createDirectory(mainFolderName);
for (let index = 0; index < 114; index++) {
    let sequenceFile = `input${index + 1}`;
    const data = fs_1.default.readFileSync(`${timingFolderName}/${addLeadingZero(index + 1)}.txt`, "utf8");
    const arrayTiming = data.split("\r\n");
    for (let z = 0, k = 0; z < const_1.verseCount[index] + 1; z++, k++) {
        if (z == 0) {
            if (parseInt(arrayTiming[z]) < 3000) {
                k = -1;
                let value = parseInt(arrayTiming[1]) + parseInt(arrayTiming[0]);
                arrayTiming[z + 1] = value.toString();
                continue;
            }
            else {
                fs_1.default.writeFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'images/1/img${addLeadingZero(k + 1)}.png'\n`);
                timeDiff = parseFloat(arrayTiming[z]);
                fs_1.default.writeFileSync(`${mainFolderName}/${sequenceFile}.txt`, `duration ${timeDiff / 1000}\n`);
            }
        }
        else {
            fs_1.default.writeFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'images/1/img${addLeadingZero(k + 1)}.png'\n`);
            timeDiff = parseFloat(arrayTiming[z]) - parseFloat(arrayTiming[z - 1]);
            fs_1.default.writeFileSync(`${mainFolderName}/${sequenceFile}.txt`, `duration ${timeDiff / 1000}\n`);
        }
        if (z == const_1.verseCount[index]) {
            fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'images/1/img${addLeadingZero(k + 1)}.png'\n`);
        }
    }
}
console.log("File is created successfully.");
//# sourceMappingURL=createvideo.js.map
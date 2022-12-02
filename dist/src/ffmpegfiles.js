"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const const_1 = require("../utils/const");
const generalfunction_1 = require("../utils/generalfunction");
const generalfunction_2 = require("../utils/generalfunction");
const mainFolderName = "ffmpeg";
const timingFolderName = "timing";
let timeDiff = 0.0;
(0, generalfunction_1.createDirectory)(mainFolderName, true);
for (let index = 1; index < 2; index++) {
    let sequenceFile = `input${index + 1}`;
    fs_1.default.writeFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'cover/${index + 1}/img${(0, generalfunction_2.addLeadingZero)(index)}.jpg'\n`);
    fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `duration 3\n`);
    const data = fs_1.default.readFileSync(`${timingFolderName}/${(0, generalfunction_2.addLeadingZero)(index + 1)}.txt`, "utf8");
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
                fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'images/1/img${(0, generalfunction_2.addLeadingZero)(k)}.jpg'\n`);
                timeDiff = parseFloat(arrayTiming[z]);
                fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `duration ${timeDiff / 1000}\n`);
                k = -1;
            }
        }
        else {
            if (k == -1) {
                fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'cover/1/img${(0, generalfunction_2.addLeadingZero)(index)}.jpg'\n`);
            }
            else {
                fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'images/1/img${(0, generalfunction_2.addLeadingZero)(k + 1)}.jpg'\n`);
            }
            timeDiff = parseFloat(arrayTiming[z]) - parseFloat(arrayTiming[z - 1]);
            fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `duration ${timeDiff / 1000}\n`);
        }
        if (z == const_1.verseCount[index]) {
            fs_1.default.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `file 'images/1/img${(0, generalfunction_2.addLeadingZero)(k + 1)}.jpg'\n`);
        }
    }
}
console.log("All ffmpeg timing files created successfully");
//# sourceMappingURL=ffmpegfiles.js.map
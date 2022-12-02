"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectory = exports.addLeadingZero = void 0;
const fs_1 = __importDefault(require("fs"));
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
exports.addLeadingZero = addLeadingZero;
function createDirectory(folderName, overwrite = false) {
    try {
        if (!fs_1.default.existsSync(folderName)) {
            fs_1.default.mkdirSync(folderName);
        }
        if (overwrite) {
            fs_1.default.rmdirSync(folderName, { recursive: true });
            fs_1.default.mkdirSync(folderName);
        }
    }
    catch (err) {
        console.error(err);
    }
}
exports.createDirectory = createDirectory;
//# sourceMappingURL=generalfunction.js.map
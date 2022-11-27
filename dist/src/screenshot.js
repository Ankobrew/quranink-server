"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const const_1 = require("./const");
const mainFolderName = "images";
const path = `${mainFolderName}/114/img006.jpg`;
function createDirectory() {
    try {
        if (!fs_1.default.existsSync(`${mainFolderName}`)) {
            fs_1.default.mkdirSync(`${mainFolderName}`);
        }
    }
    catch (err) {
        console.error(err);
    }
    for (let index = 1; index < 115; index++) {
        const folderName = `${mainFolderName}/${index}`;
        try {
            if (!fs_1.default.existsSync(folderName)) {
                fs_1.default.mkdirSync(folderName);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
async function takeScreenshot() {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    for (let i = 0; i < 114; i++) {
        for (let z = 0; z < const_1.verseCount[i]; z++) {
            const website_url = `http://localhost:3000/chapters/${i + 1}/${z + 1}`;
            await page.goto(website_url, { waitUntil: "networkidle0" });
            await page.screenshot({
                path: `${mainFolderName}/${i + 1}/img00${z + 1}.jpg`,
                fullPage: true,
            });
        }
    }
    await browser.close();
}
try {
    if (!fs_1.default.existsSync(path)) {
        createDirectory();
        takeScreenshot();
    }
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=screenshot.js.map
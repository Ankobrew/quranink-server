import puppeteer from "puppeteer";
import fs from "fs";
import { verseCount } from "../utils/const";
import { createDirectory, addLeadingZero } from "../utils/generalfunction";

const mainFolderName = "images";

const path = `${mainFolderName}/114/img006.jpg`;

function createDestination() {
  createDirectory(mainFolderName);

  for (let index = 1; index < 115; index++) {
    const folderName = `${mainFolderName}/${index}`;

    createDirectory(folderName);
  }
}

async function takeScreenshot() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  for (let i = 0; i < 114; i++) {
    for (let z = 0; z < verseCount[i]; z++) {
      const website_url = `http://localhost:3000/chapters/${i + 1}/${z + 1}`;
      // Open URL in current page
      await page.goto(website_url, { waitUntil: "networkidle0" });
      // Capture screenshot
      await page.screenshot({
        path: `${mainFolderName}/${i + 1}/img${addLeadingZero(z + 1)}.jpg`,
        fullPage: true,
      });
      // Close the browser instance
    }
  }

  await browser.close();
}

try {
  if (!fs.existsSync(path)) {
    createDestination();

    takeScreenshot();
  } else {
    console.log("Screenshoots All ready Exists");
  }
} catch (err) {
  console.error(err);
}

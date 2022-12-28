import puppeteer from "puppeteer";
import { verseCount } from "../utils/const";
import { createDirectory, addLeadingZero } from "../utils/generalfunction";

const mainFolderName = "ffmpeg/images";

export function createDestination() {
  createDirectory(mainFolderName);

  createDirectory(`${mainFolderName}/cover`);

  for (let index = 1; index < 115; index++) {
    const folderName = `${mainFolderName}/${index}`;

    createDirectory(folderName);
  }
}

export async function takeScreenshot() {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  for (let i = 0; i < 114; i++) {
    const website_url = `http://localhost:3000/chapters/cover/${i + 1}`;
    // Open URL in current page
    await page.goto(website_url, { waitUntil: "networkidle0" });
    // Capture screenshot
    await page.screenshot({
      path: `${mainFolderName}/cover/cover${i + 1}.jpg`,
      fullPage: false,
      quality: 100,
    });
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

  http: await browser.close();
}

createDestination();
takeScreenshot();

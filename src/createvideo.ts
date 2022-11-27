import fs from "fs";
import { verseCount } from "./const";

const mainFolderName = "ffmpeg";

const timingFolderName = "timing/alqatami";

let timeDiff = 0;

function createDirectory() {
  try {
    if (!fs.existsSync(mainFolderName)) {
      fs.mkdirSync(mainFolderName);
    }
  } catch (err) {
    console.error(err);
  }
}

createDirectory();

const data = fs.readFileSync(`${timingFolderName}/001.txt`, "utf8");
const arr = data.split("\r\n");

for (let index = 0; index < verseCount[0]; index++) {
  if (index == 0) {
    fs.writeFileSync(
      `${mainFolderName}/input1.txt`,
      `file 'images/1/img00${index + 1}.png'\n`
    );
    timeDiff = parseFloat(arr[index]) / 1000;
    fs.appendFileSync(`${mainFolderName}/input1.txt`, `duration ${timeDiff}\n`);
  } else {
    fs.appendFileSync(
      `${mainFolderName}/input1.txt`,
      `file 'images/1/img00${index + 1}.png'\n`
    );
    timeDiff = (parseFloat(arr[index]) - parseFloat(arr[index - 1])) / 1000;
    fs.appendFileSync(`${mainFolderName}/input1.txt`, `duration ${timeDiff}\n`);
  }

  if (index == verseCount[0] - 1) {
    fs.appendFileSync(
      `${mainFolderName}/input1.txt`,
      `file 'images/1/img00${index + 1}.png'\n`
    );
  }
}

console.log("File is created successfully.");

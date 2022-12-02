import fs from "fs";
import { verseCount } from "../utils/const";
import { createDirectory } from "../utils/generalfunction";
import { addLeadingZero } from "../utils/generalfunction";

const mainFolderName = "ffmpeg";
const timingFolderName = "timing";
let timeDiff = 0.0;

createDirectory(mainFolderName, true);

for (let index = 0; index < 114; index++) {
  let sequenceFile = `input${index + 1}`;

  fs.writeFileSync(
    `${mainFolderName}/${sequenceFile}.txt`,
    `file 'images/cover/cover${index + 1}.jpg'\n`
  );

  fs.appendFileSync(`${mainFolderName}/${sequenceFile}.txt`, `duration 3\n`);
  const data = fs.readFileSync(
    `${timingFolderName}/${addLeadingZero(index + 1)}.txt`,
    "utf8"
  );
  const arrayTiming = data.split("\r\n");

  for (let z = 0, k = 0; z < verseCount[index] + 1; z++, k++) {
    if (z == 0) {
      if (parseInt(arrayTiming[z]) < 3000) {
        k = -1;
        let value = parseInt(arrayTiming[1]) + parseInt(arrayTiming[0]);
        arrayTiming[z + 1] = value.toString();
        continue;
      } else {
        fs.appendFileSync(
          `${mainFolderName}/${sequenceFile}.txt`,
          `file 'images/cover/cover${index + 1}.jpg'\n`
        );
        timeDiff = parseFloat(arrayTiming[z]);
        fs.appendFileSync(
          `${mainFolderName}/${sequenceFile}.txt`,
          `duration ${timeDiff / 1000}\n`
        );

        k = -1;
      }
    } else {
      fs.appendFileSync(
        `${mainFolderName}/${sequenceFile}.txt`,
        `file 'images/1/img${addLeadingZero(k + 1)}.jpg'\n`
      );

      timeDiff = parseFloat(arrayTiming[z]) - parseFloat(arrayTiming[z - 1]);
      fs.appendFileSync(
        `${mainFolderName}/${sequenceFile}.txt`,
        `duration ${timeDiff / 1000}\n`
      );
    }

    if (z == verseCount[index]) {
      fs.appendFileSync(
        `${mainFolderName}/${sequenceFile}.txt`,
        `file 'images/outro.jpg'\n`
      );
      fs.appendFileSync(
        `${mainFolderName}/${sequenceFile}.txt`,
        `duration 6\n`
      );
      fs.appendFileSync(
        `${mainFolderName}/${sequenceFile}.txt`,
        `file 'images/outro.jpg'\n`
      );
    }
  }
}

console.log("All ffmpeg timing files created successfully");

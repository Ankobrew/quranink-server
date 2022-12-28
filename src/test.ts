import { compareFileNames, readDirec } from "../utils/generalfunction";
import { quranChapter } from "../utils/const";

const quranChapterArray = Object.entries(quranChapter).map(([key, value]) => [
  key,
  value,
]);

let files = readDirec("ffmpeg/video");

files = files.sort(compareFileNames);

for (let index = 0; index < 2; index++) {
  let fileName = files[index];
  let num = fileName.split(".")[0];
  console.log(`ffmpeg/video/${fileName}`);

  console.log(
    `Surah ${
      quranChapterArray[parseInt(num) - 1][0]
    } recited by Sheikh Nasser Al Qatami | English translation`
  );

  console.log(
    `English translation of the Quran, Surah ${
      quranChapterArray[parseInt(num) - 1][0]
    }(${quranChapterArray[index][1]}) recited by Sheikh Nasser Al Qatami.`
  );
}

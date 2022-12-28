import { isFileExist, checkForAssetFile } from "../utils/generalfunction";
import { createDestination, takeScreenshot } from "./screenshot";

async function main() {
  const result = await checkForAssetFile("video", ".mp4");

  console.log(result);

  if (result) {
    console.log("Videos exist");
  } else {
    if (isFileExist("images/114/img006.jpg")) {
      if (isFileExist("ffmpeg/input114.txt") && isFileExist("audio/114.mp3")) {
        console.log("ffmpeg timings and audio file found");
      } else {
        console.log("ffmpeg timings file or audio not found");
      }
    } else {
      createDestination();
      takeScreenshot();
      main();
    }
  }
}
main();

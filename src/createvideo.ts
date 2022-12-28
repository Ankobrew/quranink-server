import { cli, addLeadingZero } from "../utils/generalfunction";

for (let i = 1; i <= 114; i++) {
  cli(
    `cd ffmpeg && ffmpeg -f concat -i input${i}.txt -vf scale=1920:-1 -fps_mode vfr -pix_fmt yuv420p video/z${i}.mp4 && ffmpeg -i video/z${i}.mp4 -itsoffset 3 -i audio/${addLeadingZero(
      i
    )}.mp3 -c:v copy -map 0:v -map 1:a -y video/${i}.mp4 && rm video/z${i}.mp4`
  );
}

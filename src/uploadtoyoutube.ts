import { google, youtube_v3 } from "googleapis";
import { request } from "graphql-request";

import fs from "fs";
import { OAuth2Client } from "google-auth-library";
import { quranChapter } from "../utils/const";
import {
  compareFileNames,
  deleteDir,
  readDirec,
} from "../utils/generalfunction";

const query = `
query {
  getCode {
    content
  }
}
`;

const quranChapterArray = Object.entries(quranChapter).map(([key, value]) => [
  key,
  value,
]);

async function wait(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

const endpoint = "http://localhost:4000/";

async function getCode(): Promise<string> {
  const data = await request<{ getCode: { content: string } }>(endpoint, query);

  return data.getCode.content;
}

async function getAccessToken(): Promise<OAuth2Client> {
  const oauth2Client = new OAuth2Client({
    clientId:
      "237698386296-cbo4e7l0sfpuha3v4lqujnltfpes6j73.apps.googleusercontent.com",
    clientSecret: "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",
    redirectUri: "http://localhost:3000/oauth",
  });

  // Generate an authentication URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube"],
  });

  // Prompt the user to visit the authentication URL and provide the authorization code
  console.log(
    `Visit the following URL to authorize this application: ${authUrl}`
  );

  console.log("Waiting for 20 seconds...");
  await wait(20);
  console.log("Done waiting!");

  const code = await getCode();

  console.log(`The authorization code is ${code}`);

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return oauth2Client;
}

async function uploadVideo(
  filePath: string,
  title: string,
  description: string,
  tags: string[],
  OAuth2Client: OAuth2Client
): Promise<string> {
  // Initialize the YouTube API
  const youtube = google.youtube({
    version: "v3",
    auth: OAuth2Client,
  });
  const requestBody: youtube_v3.Schema$Video = {
    snippet: {
      title,
      description,
      tags,
      categoryId: "27",
    },
    status: {
      privacyStatus: "public",
    },
  };
  const media = {
    body: fs.createReadStream(filePath),
  };
  return new Promise((resolve, reject) => {
    youtube.videos.insert(
      { part: ["snippet", "status"], requestBody, media },
      (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.data.id);
        }
      }
    );
  });
}

function addToPlaylist(
  playlistId: string,
  videoId: string,
  OAuth2Client: OAuth2Client
) {
  //Add the video to the playlist

  const youtube = google.youtube({
    version: "v3",
    auth: OAuth2Client,
  });
  const playlistItemRequestBody: youtube_v3.Schema$PlaylistItem = {
    snippet: {
      playlistId,
      resourceId: {
        kind: "youtube#video",
        videoId: videoId,
      },
    },
  };
  youtube.playlistItems.insert(
    { part: ["snippet"], requestBody: playlistItemRequestBody },
    (error: any, response: any) => {
      if (error) {
        console.error(error);
      } else {
        console.log(
          `Video was added to playlist! Playlist item ID: ${response.data.id}`
        );
      }
    }
  );
}

async function main() {
  const OAuth2Client = await getAccessToken();

  let files = readDirec("ffmpeg/video");

  files = files.sort(compareFileNames);

  for (let index = 0; index < 3; index++) {
    let fileName = files[index];
    let num = fileName.split(".")[0];
    const videoId = await uploadVideo(
      `ffmpeg/video/${fileName}`,
      `Surah ${
        quranChapterArray[parseInt(num) - 1][0]
      } recited by Sheikh Nasser Al Qatami | English translation`,
      `English translation of the Quran, Surah ${
        quranChapterArray[parseInt(num) - 1][0]
      }(${
        quranChapterArray[parseInt(num) - 1][1]
      }) recited by Sheikh Nasser Al Qatami.`,
      [
        "Islam",
        "Quran",
        "Surah",
        "Nasser Al Qatami",
        "English",
        "translation",
        "recitation",
      ],
      OAuth2Client
    );
    addToPlaylist("PLcK9Aw4kFuDbsa2lGZWHJG9V3YleAj4HH", videoId, OAuth2Client);
    deleteDir(`ffmpeg/video/${fileName}`);
  }
}

main();

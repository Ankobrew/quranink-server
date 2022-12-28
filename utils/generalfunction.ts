import fs from "fs";
import { exec } from "child_process";

export function addLeadingZero(value: Number): string {
  if (value < 10) {
    return "00" + value.toString();
  } else if (value < 100) {
    return "0" + value.toString();
  } else {
    return value.toString();
  }
}

export function createDirectory(folderName: string, overwrite = false) {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    if (overwrite) {
      fs.rmdirSync(folderName, { recursive: true });
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
}

export function isFileExist(path: string): boolean {
  try {
    fs.statSync(path);
    return true;
  } catch (error) {
    return false;
  }
}

export async function checkForAssetFile(
  folderName: string,
  extension: string
): Promise<boolean> {
  try {
    // Get a list of all files in the `video` folder
    const files = await fs.promises.readdir(folderName);

    // Check if any of the files have the `.mp4` file extension
    return files.some((file) => file.endsWith(extension));
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function cli(command: string) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}

export function readDirec(dir: string): string[] {
  try {
    const files = fs.readdirSync(dir);
    return files;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function compareFileNames(a: string, b: string): number {
  const aNumber = parseInt(a.split(".")[0], 10);
  const bNumber = parseInt(b.split(".")[0], 10);
  return aNumber - bNumber;
}

export function deleteDir(dir: string) {
  try {
    fs.unlinkSync(dir);
  } catch (err) {
    console.error(err);
  }
}

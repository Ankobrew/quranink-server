import fs from "fs";

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

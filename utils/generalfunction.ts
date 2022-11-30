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

export function createDirectory(folderName: string) {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    } else {
      fs.rmdirSync(folderName, { recursive: true });
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
}

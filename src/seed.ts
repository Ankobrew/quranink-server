import { prisma } from "../lib/prisma";
import { Convert } from "../lib/models";
import { cConvert } from "../lib/cmodels";
import fetch from "node-fetch";

async function main() {
  let cResponse = await fetch(
    "https://api.quran.com/api/v4/chapters?language=en"
  );
  let cdata = await cResponse.json();
  let csData: string = JSON.stringify(cdata);

  let chapterName = cConvert.toChapterInfo(csData);

  for (let surah = 1; surah < 115; surah++) {
    let response = await fetch(
      `https://quranenc.com/api/v1/translation/sura/english_rwwad/${surah}`
    );
    let data = await response.json();
    let sData: string = JSON.stringify(data);

    let quran = Convert.toQuran(sData);

    const chapter = await prisma.chapter.create({
      data: {
        id: surah,
        name: chapterName.chapters[surah - 1].name_simple,
      },
    });

    console.log(chapter);

    for (let index = 0; index < quran.result.length; index++) {
      const verse = await prisma.verse.create({
        data: {
          chapterId: parseInt(quran.result[index].sura),
          ayah: parseInt(quran.result[index].aya),
          content: quran.result[index].translation,
        },
      });
      console.log(verse);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

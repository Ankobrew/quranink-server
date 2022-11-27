import { prisma } from "../lib/prisma";
async function main() {
  //   const Chapter = await prisma.chapter.findUnique({
  //     where: {
  //       id: 1,
  //     },
  //   });

  //   console.log(Chapter);

  let verseCount = [];

  for (let index = 90; index < 114; index++) {
    const Verse = await prisma.chapter.findUnique({
      include: {
        verses: {},
      },
      where: {
        id: index + 1,
      },
    });

    verseCount[index - 90] = Verse?.verses.length;
  }

  console.log(verseCount);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

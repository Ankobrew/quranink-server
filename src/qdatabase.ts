import { prisma } from "../lib/prisma";
async function main() {
  //   const Chapter = await prisma.chapter.findUnique({
  //     where: {
  //       id: 1,
  //     },
  //   });

  //   console.log(Chapter);

  const Verse = await prisma.verse.findMany({
    where: {
      chapterId: {
        equals: 1,
      },
      ayah: {
        equals: 1,
      },
    },
  });

  console.log(Verse);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "../lib/prisma";
async function main() {
  //   const Chapter = await prisma.chapter.findUnique({
  //     where: {
  //       id: 1,
  //     },
  //   });

  //   console.log(Chapter);

  const Verse = await prisma.chapter.findUnique({
    include: {
      verses: {},
    },
    where: {
      id: 1,
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

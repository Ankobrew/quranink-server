"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
async function main() {
    let verseCount = [];
    for (let index = 90; index < 114; index++) {
        const Verse = await prisma_1.prisma.chapter.findUnique({
            include: {
                verses: {},
            },
            where: {
                id: index + 1,
            },
        });
        verseCount[index - 90] = Verse === null || Verse === void 0 ? void 0 : Verse.verses.length;
    }
    console.log(verseCount);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.prisma.$disconnect();
});
//# sourceMappingURL=qdatabase.js.map
import { Resolvers } from "./type";

export const resolvers: Resolvers = {
  Query: {
    chapters: (_parent, _args, ctx) => {
      return ctx.prisma.chapter.findMany({
        include: {
          verses: {},
        },
      });
    },
    verses: (_parent, _args, ctx) => {
      return ctx.prisma.verse.findMany();
    },
    getOneChapter: (_parent, args, ctx) => {
      return ctx.prisma.chapter.findUnique({
        include: {
          verses: {},
        },
        where: {
          id: args.id,
        },
      });
    },

    getOneVerse: (_parent, args, ctx) => {
      return ctx.prisma.verse.findMany({
        where: {
          chapterId: {
            equals: args.chapterId,
          },
          ayah: {
            equals: args.ayah,
          },
        },
      });
    },
  },
};

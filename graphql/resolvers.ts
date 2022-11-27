import { Resolvers } from "./type";
import { exec } from "child_process";

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
          id: args.chapterId,
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
    createVideo: (_parent, _args, _ctx) => {
      exec("cd graphql && ls", (error, stdout, stderr) => {
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
      return 2;
    },
  },
};

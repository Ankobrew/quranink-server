import { gql } from "apollo-server";

export const typeDefs = gql`
  type Chapter {
    id: Int
    name: String
    verses: [Verse]!
  }

  type Verse {
    id: Int
    ayah: Int
    content: String
    chapterId: Int
  }

  type Query {
    chapters: [Chapter]!
    verses: [Verse]!
    getOneChapter(id: Int!): Chapter!
    getOneVerse(chapterId: Int!, ayah: Int!): [Verse]!
  }
`;

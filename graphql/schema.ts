export const typeDefs = `#graphql
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

  type Code {
    content: String!
  }

  type Mutation {
    addCode(content: String!): Code!
  }

  type Query {
    chapters: [Chapter]!
    verses: [Verse]!
    getOneChapter(chapterId: Int!): Chapter!
    getOneVerse(chapterId: Int!, ayah: Int!): [Verse]!
    createVideo: Int!
    getCode: Code!
  }
`;

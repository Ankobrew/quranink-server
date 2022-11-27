"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
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
    getOneChapter(chapterId: Int!): Chapter!
    getOneVerse(chapterId: Int!, ayah: Int!): [Verse]!
    createVideo: Int!
  }
`;
//# sourceMappingURL=schema.js.map
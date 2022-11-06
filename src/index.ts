import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";

import express from "express";

import { ApolloServer } from "apollo-server-express";

import { createContext } from "../graphql/context";

const main = async () => {
  const app = express();
  const port = 4000;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});

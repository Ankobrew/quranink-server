import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { MyContext, prisma } from "../graphql/context";

import { startStandaloneServer } from "@apollo/server/standalone";

import { ApolloServer } from "@apollo/server";

async function startServer() {
  const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async ({}) => ({ prisma }),
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
}

startServer();

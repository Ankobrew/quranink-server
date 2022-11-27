"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../graphql/schema");
const resolvers_1 = require("../graphql/resolvers");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("../graphql/context");
const main = async () => {
    const app = (0, express_1.default)();
    const port = 4000;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: context_1.createContext,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Quranink Server listening on port ${port}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map
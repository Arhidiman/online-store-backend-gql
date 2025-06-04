import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './schema.js';
import { userController } from './controllers/UserController.js';
const PORT = 8000;
const app = express();
const httpServer = http.createServer(app);
const resolvers = {
    Query: {
        ...userController.Queries
    },
    Mutation: {
        ...userController.Mutatios
    }
};
const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs: schema,
        resolvers,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(cors(), bodyParser.json(), expressMiddleware(server));
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀  Server ready at: ${PORT}`);

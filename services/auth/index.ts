import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { schema } from './schema.ts';
import { userController } from './controllers/UserController.ts';

const users = [
    {name: 'Dmitry', id: 777}, {name: 'Alexey', id: 666}
];

const PORT = 8000

const app = express();
const httpServer = http.createServer(app);


const getUserById = (id: number) => users.find(user => user.id === id);

const resolvers = {
    Query: {
        ...userController
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

app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
)

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));


console.log(`🚀  Server ready at: ${PORT}`);

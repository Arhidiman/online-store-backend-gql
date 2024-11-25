import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

const PORT = 10000

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  gateway: new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'users', url: 'http://localhost:8000' },
        { name: 'products', url: 'http://localhost:7000' },
      ],
    }),
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

});

await server.start();


app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`server is listening on port ${PORT}`)



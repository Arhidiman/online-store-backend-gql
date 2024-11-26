import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'


const users = [
    {name: 'Dmitry', id: 777}, {name: 'Alexey', id: 666}
];

const PORT = 8000

const app = express();
const httpServer = http.createServer(app);

const typeDefs = gql`
    extend schema
        @link(
            url: "https://specs.apollo.dev/federation/v2.9"
            import: ["@key", "@shareable", "@external"]
        )

        type User 
            @key(fields: "id") {
            id: ID!
            name: String
        }

        type Query {
            users: [User]
            singleUser(id: ID!): User
        }
`;

const getUserById = (id: number) => users.find(user => user.id === id);

const resolvers = {
    Query: {
      users: () => users,
      singleUser: (_: any, { id }: {id: number}) => users.find(user => user.id === id),
    }
  };

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
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

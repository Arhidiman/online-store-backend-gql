import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import gql from 'graphql-tag';
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'



const products = [
    {name: 'phone', id: 1}, {name: 'cat', id: 5}
];


const PORT = 7000

const app = express();
const httpServer = http.createServer(app);
  

const typeDefs = gql`
    extend schema
        @link(
            url: "https://specs.apollo.dev/federation/v2.9"
            import: ["@key", "@shareable", "@external"]
        )

        type Product 
            @key(fields: "id") {
            id: Int!
            name: String
        }

        extend type User @key(fields: "id") {
            id: ID! @external
            surname: String
        }

        type Query {
            products: [Product]
            singleProduct(id: Int!): Product
        }
`

const resolvers = {
    Query: {
      products: () => products,
      singleProduct: (_: any, { id }: {id: number}) => products.find(product => product.id === id)
    }
  }

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

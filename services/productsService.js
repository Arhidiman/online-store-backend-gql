import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

const products = [
    {name: 'phone', id: 1}, {name: 'cat', id: 5}
];

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
      users: () => users,
      singleProduct: (_, { id }) => products.find(product => product.id === id)
    }
  }

const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers,
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 7000 },
    cors: {
        origin: ['http://localhost:10000', 'http://localhost:7000'],
        methods: ['GET', 'POST', 'UPDATE', 'PUT', 'DELETE'],
        credentials: true,
    }
});

console.log(`🚀  Server ready at: ${url}`);

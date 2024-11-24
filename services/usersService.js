import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';

const users = [
    {name: 'Dmitry', id: 777}, {name: 'Alexey', id: 666}
];

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

const getUserById = (id) => users.find(user => user.id === id);

const resolvers = {
    Query: {
      users: () => users,
      singleUser: (_, { id }) => users.find(user => user.id === id),
    },
    Product: {
      __resolveReference: (ref) => products.find(product => product.id === ref.id)
    }
  };

const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers,
    }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
    cors: {
        origin: ['http://localhost:10000', 'http://localhost:8000'],
        methods: ['GET', 'POST', 'UPDATE', 'PUT', 'DELETE'],
        credentials: true,
    }
});

console.log(`🚀  Server ready at: ${url}`);

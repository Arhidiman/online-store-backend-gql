import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import gql from 'graphql-tag';
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { dbClient } from './db/dbCLient.ts';
import { schema } from './schema.ts';
import { productsController } from './controllers/ProductsController.ts'
import { categoriesController } from './controllers/CategoriesController/CategoriesController.ts';
import { Sequelize } from 'sequelize';
import { dbConfig } from './db/config.ts';

// Option 3: Passing parameters separately (other dialects)

const { database, user, password} = dbConfig

const sequelize = new Sequelize(database, user, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: (...msg) => console.log(msg)
})


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const PORT = 7000

const app = express();
const httpServer = http.createServer(app);
  

// const typeDefs = gql`
//     extend schema
//         @link(
//             url: "https://specs.apollo.dev/federation/v2.9"
//             import: ["@key", "@shareable", "@external"]
//         )

//         type Product 
//             @key(fields: "id") {
//             id: Int!
//             name: String
//         }

//         extend type User @key(fields: "id") {
//             id: ID! @external
//             surname: String
//         }

//         type Query {
//             products: [Product]
//             singleProduct(id: Int!): Product
//         }
// `

const resolvers = {
    Query: {
    //   products: () => products,
    //   singleProduct: (_: any, { id }: {id: number}) => products.find(product => product.id === id)
        // ...ProductsController
        ...categoriesController
    }
  }


console.log(categoriesController, 'categoriesController')
// console.log(resolvers.Query)

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

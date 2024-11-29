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
import { Sequelize, Model, DataTypes } from 'sequelize';
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

const Category = sequelize.define('categories', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }

},   { tableName: 'categories', timestamps: false } )


await sequelize.sync()
console.log('sequilize successfully syncronized !')

const categories = await Category.findAll({ raw: true })

console.log(categories, 'categories find')

const PORT = 7000

const app = express();
const httpServer = http.createServer(app);


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

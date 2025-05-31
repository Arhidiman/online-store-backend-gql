import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { sequelizeInstance } from './db/sequelizeInstance.ts';
import { schema } from './schema.ts';
import { CategoriesController } from './controllers/CategoriesController.ts';
import { ProductsController } from './controllers/ProductsController.ts';
import { OrdersController } from './controllers/OrdersController.ts';
import { TransactionsController } from './controllers/TransactionsController.ts';

const PORT = 7000

const app = express();
const httpServer = http.createServer(app);


try {
    await sequelizeInstance.authenticate();
    console.log('✅ DB connected');
  
    await sequelizeInstance.sync({ alter: true }); // или { force: true } для пересоздания
    console.log('✅ DB synced');
  } catch (err) {
    console.error('❌ Failed to sync DB:', err);
    process.exit(1);
  }


const resolvers = {
    Query: {
        ...CategoriesController,
        ...ProductsController,
        ...OrdersController.Queries,
        ...TransactionsController.Queries
    },
    Mutation: {
        ...TransactionsController.Mutations,
        ...OrdersController.Mutations
    }
  }

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

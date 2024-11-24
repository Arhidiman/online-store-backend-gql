import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import {ApolloServer} from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises';
import { watch } from 'fs';

const server = new ApolloServer({
  gateway: new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'users', url: 'http://localhost:8000' },
        { name: 'products', url: 'http://localhost:7000' },
      ]
    }),
  })
});



const { url } = await startStandaloneServer(server, {
listen: { port: 10000 },
cors: {
    origin: ['http://localhost:10000', 'http://localhost:8000', 'http://localhost:7000'], // Укажите допустимые источники
    methods: ['GET', 'POST', 'UPDATE', 'PUT', 'DELETE'], // Разрешенные методы
    credentials: true // Если нужен доступ к защищённым куки
    }
})

console.log(`🚀  Server ready at: ${url}`);
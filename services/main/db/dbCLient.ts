import pg from 'pg'
import { dbConfig } from './config.ts'


const { Client } = pg
export const dbClient = new Client(dbConfig)
await dbClient.connect()

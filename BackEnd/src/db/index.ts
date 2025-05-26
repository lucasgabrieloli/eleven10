import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schemas/index'
import { env } from '../http/env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true })



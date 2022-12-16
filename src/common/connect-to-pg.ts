import { Pool } from 'pg';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });
config({ path: join(process.cwd(), '.default.env') });

export async function connectToPg() {
    const pool = new Pool({
        user: process.env.PG_USER,
        database: process.env.PG_BASE,
        host: process.env.PG_HOST,
        password: process.env.PG_PASS,
        port: +process.env.PG_PORT,
    });

    const connection = pool.connect();

    console.info('Connect to Postgres');

    return connection;
}

import { Pool } from 'pg';
import { logger } from '../utils/logger';
import { env } from '../utils/enviroment';

const connectionData = {
    user: env.PG_DB_USER,
    host: env.PG_DB_HOST,
    database: env.PG_DB_NAME,
    password: env.PG_DB_PASSWORD,
    port: env.PG_DB_PORT,
};

const pool = new Pool(connectionData)

pool.connect()
    .then(response => {
        logger.info('PG-DB is connected')
    })
    .catch(err => {
        logger.error(`PGDB is not connected: ${err}`);
        client.end();
    })

export default pool;
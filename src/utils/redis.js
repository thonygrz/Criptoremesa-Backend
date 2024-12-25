import redis from 'redis';
import { env } from "../utils/enviroment";

if (process.env.ENVIROMENT !== 'local') {
    const client = redis.createClient({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        db: env.REDIS_DB,
        read_timeout: env.REDIS_READ_TIMEOUT,
    });
    
    client.on('error', function(error){
        console.log(error);
    })
    
    module.exports = client;
}
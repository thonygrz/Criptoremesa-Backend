import { Pool, Client } from 'pg';
import { logger } from "../utils/logger";
import ObjLog from "../utils/ObjLog";
import { env } from "../utils/enviroment";
import { notifyChanges } from "../modules/sockets/sockets.coordinator";

const connectionData = {
  user: env.PG_DB_USER,
  host: env.PG_DB_HOST,
  database: env.PG_DB_NAME,
  password: env.PG_DB_PASSWORD,
  port: env.PG_DB_PORT,
  //   currentSchema: "sec_sixmap_users",
};

const pool = new Pool(connectionData);
const client = new Client(connectionData);

pool
  .connect()
  .then((response) => {
    logger.info("PG-DB is connected");
    ObjLog.log("PG-DB is connected");
    pool.on(
      'connect', client => {
        client.on('notice', notice => {
          console.log(notice.message)
        })
      }
    )
  })
  .catch((err) => {
    logger.error(`PGDB is not connected: ${err}`);
    ObjLog.log(`PGDB is not connected: ${err}`);
    client.end();
  });

// client.connect()
// .then(response => {
//   logger.info("PG-DB client-listener is connected");
//   ObjLog.log("PG-DB client-listener is connected");

//   // // Se escuchan los canales
//   // client.query("listen level_upgrade");

//   // Se recibe el evento y se envía al FE
//   // client.on('notification', async (data) => {
//   //     if (data.channel === "level_upgrade") {
//   //         const level = JSON.parse(data.payload);
//   //         notifyChanges(data.channel, level);
//   //     }
//   // });
// })
// .catch(err => {
//     logger.error(`PG-DB client-listener is not connected: ${err}`);
//     client.end();
// });

export default pool;

import socketIO from "socket.io";
import { logger } from "../../utils/logger";
import ObjLog from "../../utils/ObjLog";
import redisClient from "../../utils/redis";
import usersPGRepository from "../../modules/users/repositories/users.pg.repository";
import fs from "fs";

let socketServer = null;
const context = "Socket Coordinator";

export async function SocketServer(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling','polling']
  });
  socketServer = io;

  io.on("connection", (socket) => {
    logger.info(`[${context}] New connection stablished`);
    ObjLog.log(`[${context}] New connection stablished`);
    // console.log('in connection: ', socket.id)

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("new_connection", (val) => {
      console.log('socket from FE',socket.id)
      console.log('val ofrom FE',val)
      redisClient.set(val, socket.id);
      redisClient.get(val, function (err, reply) {
        // reply is null when the key is missing
        console.log("redis reply: ", reply);
      });

      // redisClient.end(true);
    });

    socket.on("verif_code", async (val) => {
      logger.info(`[${context}] Sending verif code notification`);
      ObjLog.log(`[${context}] Sending verif code notification`);

      // console.log('socket from FE',socket.id)
      // console.log('val ofrom FE',val)
        console.log('DEL FRONT: ',val)
        let data
        if (val.msg === 'Time started')
          data = val
        else 
          data = await usersPGRepository.verifCode(val.ident_user,val.code);

        console.log('DATA:',data)

        redisClient.get(val.email_user, function (err, reply) {
          // reply is null when the key is missing
          console.log("redis reply: ", reply);
          socketServer.sockets.to(reply).emit('verif_code_response', data);
        });
    });

    socket.on("level_upgrade", async (val) => {
      logger.info(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      console.log('socket from Sixm',socket.id)
      console.log('val from Sixm',val)
      
      notifyChanges('level_upgrade', val);
    });

    socket.on("msg_sent", async (val) => {
      logger.info(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      console.log('socket from Sixm',socket.id)
      console.log('val from Sixm',val)

      if (val.file !== 'null' && val.file !== null)
        val.file = fs.readFileSync(val.file);
      
      notifyChanges('msg_sent', val);
    });
  });
}

export function notifyChanges(event, data) {
  try {
    logger.info(`[${context}] Sending update notification to FE`);
    ObjLog.log(`[${context}] Sending update notification to FE`);

    redisClient.get(data.email_user, function (err, reply) {
      // reply is null when the key is missing
      console.log("redis reply: ", reply);
      console.log("socket sending to FE: ", data);
      socketServer.sockets.to(reply).emit(event, data);
    });

    // socketServer.sockets.emit(event, data);
  } catch (error) {
    logger.error(`[${context}] Sending update notification`);
    ObjLog.log(`[${context}] Sending update notification`);
  }
}

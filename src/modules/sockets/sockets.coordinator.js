import socketIO from "socket.io";
import { logger } from "../../utils/logger";
import ObjLog from "../../utils/ObjLog";
import redisClient from "../../utils/redis";
import usersPGRepository from "../../modules/users/repositories/users.pg.repository";

let socketServer = null;
const context = "Socket Coordinator";

export async function SocketServer(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  socketServer = io;

  io.on("connection", (socket) => {
    logger.info(`[${context}] New connection stablished`);
    ObjLog.log(`[${context}] New connection stablished`);
    // console.log('in connection: ', socket.id)

    socket.on("new_connection", (val) => {
      // console.log('socket from FE',socket.id)
      // console.log('val ofrom FE',val)
      redisClient.set(val, socket.id);
      redisClient.get(val, function (err, reply) {
        // reply is null when the key is missing
        console.log("redis reply: ", reply);
      });
    });

    socket.on("verif_code", async (val) => {
      // console.log('socket from FE',socket.id)
      // console.log('val ofrom FE',val)
        console.log('DEL FRONT: ',val)
        let data = await usersPGRepository.verifCode(val.email_user,val.code);
        console.log('DATA:',data)
        socketServer.sockets.emit('verif_code_response', data);
    });
  });
}

export function notifyChanges(event, data) {
  try {
    logger.info(`[${context}] Sending update notification`);
    ObjLog.log(`[${context}] Sending update notification`);

    // console.log('data: ',data)

    redisClient.get(data.email_user, function (err, reply) {
      // reply is null when the key is missing
      console.log("redis reply: ", reply);
      socketServer.sockets.to(reply).emit(event, data);
    });

    // socketServer.sockets.emit(event, data);
  } catch (error) {
    logger.error(`[${context}] Sending update notification`);
    ObjLog.log(`[${context}] Sending update notification`);
  }
}

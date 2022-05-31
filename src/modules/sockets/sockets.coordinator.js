import socketIO from "socket.io";
import { logger } from "../../utils/logger";
import ObjLog from "../../utils/ObjLog";
import redisClient from "../../utils/redis";
import chatSocketService from "../chat/services/chat-socket.service";
import chatPGRepository from "../chat/repositories/chat.pg.repository";
import ratesPGRepository from "../rates/repositories/rates.pg.repository";
import usersPGRepository from "../users/repositories/users.pg.repository";
import remittancesPGRepository from "../remittances/repositories/remittances.pg.repository";

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

    socket.on("new_connection", async (val) => {
      console.log('New id connection from FE: ',socket.id)
      console.log('val from FE: ',val)
      redisClient.set(val, socket.id);
      redisClient.get(val, function (err, reply) {
        // reply is null when the key is missing
        console.log("Redis id socket reply: ", reply);
      });

      let resp = await chatPGRepository.getMessages(val);
      if (resp.messages) {
        resp.messages.forEach((el) => {
          if (el.file !== 'null' && (el.type === 'image' || el.type === 'voice')) {
            el.file = fs.readFileSync(el.file);
          }
        })
      }
      notifyChanges(resp.socket_channel, resp);
      // redisClient.end(true);
    });

    socket.on("new_connection_basic_chat", async (val) => {
      console.log('New id connection basic_chat from FE: ',socket.id)
      console.log('val from FE: ',val)
      redisClient.set(val, socket.id);
      redisClient.get(val, function (err, reply) {
        // reply is null when the key is missing
        console.log("Redis id socket reply: ", reply);
      });

      let resp = await chatPGRepository.getMessagesByUniqId(val);
      if (resp.messages) {
        resp.messages.forEach((el) => {
          if (el.file !== 'null' && (el.type === 'image' || el.type === 'voice')) {
            el.file = fs.readFileSync(el.file);
          }
        })
      }
      notifyChanges(resp.socket_channel, resp);
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
          console.log("Redis id socket reply: ", reply);
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

    socket.on("from_pro_chat", async (val) => {
      logger.info(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      console.log('from_pro_chat from FE: ',socket.id)
      console.log('val from FE: ',val)

      await chatSocketService.sendMessage(val);
    });

    socket.on("to_pro_chat", async (val) => {
      logger.info(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      console.log('socket from Sixm',socket.id)
      console.log('val from Sixm',val)

      if (!val.messages && val.file !== 'null' && val.file !== null)
        val.file = fs.readFileSync(val.file);
      else if (val.messages)
        val.messages.forEach((el) => {
          if (el.file !== 'null' && (el.type === 'image' || el.type === 'voice')) {
            el.file = fs.readFileSync(el.file);
          }
        })
      
      notifyChanges('to_pro_chat', val);
    });

    socket.on("chat_asign", async (val) => {
      logger.info(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      console.log('socket from Sixm',socket.id)
      console.log('val from Sixm',val)

      notifyChanges('chat_asign', val);
    });

    socket.on("from_basic_chat", async (val) => {
      logger.info(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      console.log('from_basic_chat from FE: ',socket.id)
      console.log('val from FE: ',val)

      await chatSocketService.sendMessage(val);
    });

    socket.on("to_basic_chat", async (val) => {
      logger.info(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      console.log('New id connection from FE: ',socket.id)
      console.log('val from FE: ',val)

      notifyChanges('to_basic_chat', val);
    });

    socket.on("get_rate", async (val) => {
      logger.info(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      console.log('get_rate from FE: ',socket.id)
      console.log('val from FE: ',val)

      let rate = await ratesPGRepository.getRate(val);
      rate.email_user = val.email_user
      notifyChanges('get_rate', rate);
    });

    socket.on("get_bank_fee", async (val) => {
      logger.info(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      console.log('get_rate from FE: ',socket.id)
      console.log('val from FE: ',val)

      let fee = await remittancesPGRepository.getBankFee(val);
      console.log('LLEGO ESTO DE BD: ',)
      fee.email_user = val.email_user
      notifyChanges('get_bank_fee', fee);
    });

    socket.on("rate_change", async (val) => {
      logger.info(`[${context}] Receiving data from backend`);
      ObjLog.log(`[${context}] Receiving data from backend`);

      console.log('rate_change from BE: ',socket.id)
      console.log('val from BE: ',val)

      socketServer.emit('rate_change', val);
    });
  });
}

export function notifyChanges(event, data) {
  try {
    logger.info(`[${context}] Sending update notification to FE`);
    ObjLog.log(`[${context}] Sending update notification to FE`);

    let redisKey

    if (data.email_user) redisKey = data.email_user
    else if (data.uniq_id) redisKey = data.uniq_id  

    redisClient.get(redisKey, function (err, reply) {
      // reply is null when the key is missing
      console.log("Redis id socket reply: ", reply);
      console.log("socket sending to FE: ", data);
      socketServer.sockets.to(reply).emit(event, data);
    });
      
    // socketServer.sockets.emit(event, data);
  } catch (error) {
    logger.error(`[${context}] Sending update notification`);
    ObjLog.log(`[${context}] Sending update notification`);
  }
}

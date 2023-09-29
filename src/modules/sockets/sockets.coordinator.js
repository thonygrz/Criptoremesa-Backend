import socketIO from "socket.io";
import { logger } from "../../utils/logger";
import ObjLog from "../../utils/ObjLog";
import redisClient from "../../utils/redis";
import chatSocketService from "../chat/services/chat-socket.service";
import chatPGRepository from "../chat/repositories/chat.pg.repository";
import ratesPGRepository from "../rates/repositories/rates.pg.repository";
import usersPGRepository from "../users/repositories/users.pg.repository";
import remittancesPGRepository from "../remittances/repositories/remittances.pg.repository";
// import {replaceOperationRoute} from '../../app/server'

import fs from "fs";

let socketServer = null;
const context = "Socket Coordinator";

export async function SocketServer(server) {
  const io = socketIO(server, {
    cors: {
      origin: ['https://bhtest.bithonor.es','https://bhtest.bithonor.com'],
      methods: ["GET", "POST"],
    },
    transports: ['websocket','flashsocket','htmlfile','xhr-polling','jsonp-polling','polling']
  });
  socketServer = io;

  io.on("connection", (socket) => {
    logger.debug(`[${context}] New connection stablished`);
    ObjLog.log(`[${context}] New connection stablished`);

    socket.on("disconnect", (reason) => {
      logger.warn(`DISCONNECT REASON: ${reason}`);
    });

    socket.on("connect_error", (err) => {
      logger.error(`connect_error due to ${err.message}`);
    });

    socket.on("new_connection", async (val) => {
      redisClient.set(val, socket.id);
      redisClient.get(val, function (err, reply) {
        // reply is null when the key is missing
        // console.log("Redis id socket reply: ", reply);
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
      redisClient.set(val, socket.id);
      redisClient.get(val, function (err, reply) {
        // reply is null when the key is missing
        // console.log("Redis id socket reply: ", reply);
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
      logger.debug(`[${context}] Sending verif code notification`);
      ObjLog.log(`[${context}] Sending verif code notification`);

        let data
        if (val.msg === 'Time started')
          data = val
        else 
          data = await usersPGRepository.verifCode(val.ident_user,val.code);

        redisClient.get(val.email_user, function (err, reply) {
          // reply is null when the key is missing
          socketServer.sockets.to(reply).emit('verif_code_response', data);
        });
    });

    socket.on("level_upgrade", async (val) => {
      logger.debug(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      notifyChanges('level_upgrade', val);
    });

    socket.on("from_pro_chat", async (val) => {
      logger.debug(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      await chatSocketService.sendMessage(val);
    });

    socket.on("to_pro_chat", async (val) => {
      logger.debug(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

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
      logger.debug(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      notifyChanges('chat_asign', val);
    });

    socket.on("from_basic_chat", async (val) => {
      logger.debug(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      await chatSocketService.sendMessage(val);
    });

    socket.on("to_basic_chat", async (val) => {
      logger.debug(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      notifyChanges('to_basic_chat', val);
    });

    socket.on("get_rate", async (val) => {
      logger.debug(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      let rate = await ratesPGRepository.getRate(val);
      rate.email_user = val.email_user
      notifyChanges('get_rate', rate);
    });

    socket.on("get_bank_fee", async (val) => {
      logger.debug(`[${context}] Receiving data from frontend`);
      ObjLog.log(`[${context}] Receiving data from frontend`);

      console.log('get_bank_fee: ',val)

      let fee = await remittancesPGRepository.getBankFee(val);
      fee.email_user = val.email_user

      console.log('response: ',fee)

      notifyChanges('get_bank_fee', fee);
    });

    socket.on("rate_change", async (val) => {
      logger.debug(`[${context}] Receiving data from backend`);
      ObjLog.log(`[${context}] Receiving data from backend`);

      socketServer.emit('rate_change', val);
    });

    socket.on("operation_route_update", async (val) => {
      logger.debug(`[${context}] Receiving data from another backend`);
      ObjLog.log(`[${context}] Receiving data from another backend`);

      // replaceOperationRoute(val)

      routes.forEach((el,i) => {
        if (el.id_operation_route === val.operationRoute.id_operation_route) 
        routes[i].profit_margin = val.operationRoute.profit_margin
        routes[i].percent_limit = val.operationRoute.percent_limit
      })
    });
  });
}

export function notifyChanges(event, data) {
  try {
    if (!data.api) {
      logger.debug(`[${context}] Sending update notification to FE`);
      ObjLog.log(`[${context}] Sending update notification to FE`);
    }

    let redisKey

    if (data.email_user) redisKey = data.email_user
    else if (data.uniq_id) redisKey = data.uniq_id  

    if (redisKey) {
      redisClient.get(redisKey, function (err, reply) {
        // reply is null when the key is missing
        logger.debug(`Sendind socket to FE. Redis id: ${reply}. Data: ${data}`);
        socketServer.sockets.to(reply).emit(event, data);
      });
    } else if (data.api) {
      // logger.debug(`Sendind API socket to FE. Data: ${data}`)
      socketServer.sockets.emit(event, data);
    } else {
      logger.error('Socket id not found in Redis')
    }
      
    // socketServer.sockets.emit(event, data);
  } catch (error) {
    logger.error(`[${context}] Sending update notification`);
    ObjLog.log(`[${context}] Sending update notification`);
  }
}
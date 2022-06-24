import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import exchangesRepository from "../repositories/exchanges.pg.repository";
import redisClient from "../../../utils/redis";

const exchangesService = {};
const context = "exchanges Service";

exchangesService.getExchangeRangeRates = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting exchanges`);
    ObjLog.log(`[${context}]: Getting exchanges`);

    let data = await exchangesRepository.getExchangeRangeRates();

    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

exchangesService.getExchangeRates = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting exchange rates`);
    ObjLog.log(`[${context}]: Getting exchange rates`);

    let data = await exchangesRepository.getExchangeRates();

    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

function waitingPreExchange(id_pre_exchange) {
  const timmy = setTimeout(async () => {
    let resp = await exchangesRepository.expiredPreExchange(id_pre_exchange);
    if (resp.email_user)
      notifyChanges('expired_exchange', resp);
  }, 300000);
  redisClient.set(id_pre_exchange.toString(), timmy[Symbol.toPrimitive]());
}

exchangesService.startPreExchange = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Starting preexchange`);
    ObjLog.log(`[${context}]: Starting preexchange`);
    let data = await exchangesRepository.startPreExchange(req.body.exchangeData);
    
    if (data.message === 'Pre-exchange succesfully inserted.'){
      
      if (data.previous_id_pre_exchange){
        redisClient.get(data.previous_id_pre_exchange, function (err, reply) {
          // reply is null when the key is missing
          clearTimeout(reply)
        });
      }
      
      waitingPreExchange(data.id_pre_exchange);
    }
      
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

exchangesService.getPreExchangeByUser = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting preexchange by user`);
    ObjLog.log(`[${context}]: Getting preexchange by user`);
    let data = await exchangesRepository.getPreExchangeByUser(req.params.email_user);

    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

exchangesService.cancelPreExchange = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Canceling preexchange by user`);
    ObjLog.log(`[${context}]: Canceling preexchange by user`);

    redisClient.get(req.params.id_pre_exchange, function (err, reply) {
      // reply is null when the key is missing
      clearTimeout(reply)
    });
    let data = await exchangesRepository.cancelPreExchange(req.params.id_pre_exchange);

    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

exchangesService.insertExchange = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Inserting exchange`);
    ObjLog.log(`[${context}]: Inserting exchange`);

    let data

    if (req.query.type === 'COMPRA') {
      data = await exchangesRepository.insertBuyExchange(req.body);
    } 
    else if (req.query.type === 'VENTA') {
      data = await exchangesRepository.insertSellExchange(req.body);
    }
    else if (req.query.type === 'RETIRO') {
      data = await exchangesRepository.insertWithdrawExchange(req.body);
    }
    else if (req.query.type === 'DEPOSITO') {
      data = await exchangesRepository.insertDepositExchange(req.body);
    }
    else if (req.query.type === 'CONVERSION') {
      data = await exchangesRepository.insertConversionExchange(req.body);
    }

    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

export default exchangesService;
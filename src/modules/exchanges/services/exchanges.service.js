import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import exchangesRepository from "../repositories/exchanges.pg.repository";

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
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

export default exchangesService;
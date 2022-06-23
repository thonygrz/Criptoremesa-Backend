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

export default exchangesService;
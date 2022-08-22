import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import currencyRepository from "../repositories/currencies.pg.repository";

const currenciesService = {};
const context = "destiny Countries Service";

currenciesService.getCurrenciesByCountry = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting currencies by Country`);
    ObjLog.log(`[${context}]: Getting currencies by Country`);
    let data
    if (req.query.origin === true)
      data = await currencyRepository.getOriginCurrenciesByCountry(req.query.country_id);
    else if (!req.query.country_id)
      data = await currencyRepository.getCurrenciesByType(req.query.type);
    else 
      data = await currencyRepository.getDestinyCurrenciesByCountry(req.query.country_id);
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

export default currenciesService;
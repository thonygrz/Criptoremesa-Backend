import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import currenciesService from "../services/currencies.service";

const currenciesController = {};
const context = "destiny Countries Controller";

//AUTENTICACION CON PASSPORT
currenciesController.getCurrenciesByCountry = (req, res, next) => {
  try {
    const countryId = req.query.country_id;
    const origin = req.query.origin;
    logger.info(`[${context}]: Sending service to get currencies by Country`);
    ObjLog.log(`[${context}]: Sending service to get currencies by Country`);

    currenciesService.getCurrenciesByCountry(req, res, next,countryId,origin);
  } catch (error) {
    next(error);
  }
};

export default currenciesController;

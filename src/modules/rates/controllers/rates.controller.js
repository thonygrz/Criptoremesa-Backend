import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ratesService from "../services/rates.service";
const ratesController = {};
const context = "rates Controller";

ratesController.rangeRates = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get range Rates`);
    ObjLog.log(`[${context}]: Sending service to get range Rates`);

    ratesService.rangeRates(req, res, next);
  } catch (error) {
    next(error);
  }
};

ratesController.rateTypes = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get rate Types`);
    ObjLog.log(`[${context}]: Sending service to get rate Types`);

    ratesService.rateTypes(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default ratesController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ratesService from "../services/rates.service";
const ratesController = {};
const context = "rates Controller";

ratesController.getRangeRates = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get rates`);
    ObjLog.log(`[${context}]: Sending service to get rates`);

    ratesService.getRangeRates(req, res, next);
  } catch (error) {
    next(error);
  }
};


export default ratesController;

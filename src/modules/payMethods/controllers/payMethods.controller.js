import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import payMethodsService from "../services/payMethods.service";

const payMethodsController = {};
const context = "pay Methods Controller";

//AUTENTICACION CON PASSPORT
payMethodsController.getPayMethodsByCountryAndCurrency = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get pay methods by Country and Currency`);
    ObjLog.log(`[${context}]: Sending service to get pay methods by Country and Currency`);

    payMethodsService.getPayMethodsByCountryAndCurrency(req, res, next);
  } catch (error) {
    next(error);
  }
};

payMethodsController.getPayMethodById = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get pay methods by Id`);
    ObjLog.log(`[${context}]: Sending service to get pay methods by Id`);

    payMethodsService.getPayMethodById(req, res, next);
  } catch (error) {
    next(error);
  }
};

payMethodsController.depositMethodsByBank = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get deposit methods by bank`);
    ObjLog.log(`[${context}]: Sending service to get deposit methods by bank`);

    payMethodsService.depositMethodsByBank(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default payMethodsController;

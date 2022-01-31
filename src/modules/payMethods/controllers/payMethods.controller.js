import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import payMethodsService from "../services/payMethods.service";

const payMethodsController = {};
const context = "pay Methods Controller";

//AUTENTICACION CON PASSPORT
payMethodsController.getPayMethodsByCountry = (req, res, next) => {
  try {
    const countryId = req.params.country_id;
    logger.info(`[${context}]: Sending service to get pay methods by Country`);
    ObjLog.log(`[${context}]: Sending service to get pay methods by Country`);

    payMethodsService.getPayMethodsByCountry(req, res, next,countryId);
  } catch (error) {
    next(error);
  }
};

payMethodsController.getPayMethodById = (req, res, next) => {
  try {
    const payMethodId = req.params.pay_method_id;
    logger.info(`[${context}]: Sending service to get pay methods by Id ${payMethodId}`);
    ObjLog.log(`[${context}]: Sending service to get pay methods by Id ${payMethodId}`);

    payMethodsService.getPayMethodById(req, res, next,payMethodId);
  } catch (error) {
    next(error);
  }
};

export default payMethodsController;

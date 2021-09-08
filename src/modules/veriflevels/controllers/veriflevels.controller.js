import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import veriflevelsService from "../services/veriflevels.service";

const veriflevelsController = {};
const context = "veriflevels Controller";

//AUTENTICACION CON PASSPORT
veriflevelsController.getveriflevels = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get veriflevels`);
    ObjLog.log(`[${context}]: Sending service to get veriflevels`);

    veriflevelsService.getveriflevels(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.requestWholesalePartner = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to request Wholesale Partner`);
    ObjLog.log(`[${context}]: Sending service to request Wholesale Partner`);

    veriflevelsService.requestWholesalePartner(req, res, next);
  } catch (error) {
    next(error);
  }
};


export default veriflevelsController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import resid_countriesService from "../services/resid_countries.service";

const resid_countriesController = {};
const context = "resid_countries Controller";

//AUTENTICACION CON PASSPORT
resid_countriesController.getresid_countries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getresid_countries(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getresid_countriesClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getresid_countriesClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getid_by_name = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getid_by_name(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getISOCodeById = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getISOCodeById(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.isPolExp = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get pol exp country`);
    ObjLog.log(`[${context}]: Sending service to get pol exp country`);

    resid_countriesService.isPolExp(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default resid_countriesController;

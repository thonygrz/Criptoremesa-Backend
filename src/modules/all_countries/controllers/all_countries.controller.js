import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import all_countriesService from "../services/all_countries.service";

const all_countriesController = {};
const context = "all_countries Controller";

//AUTENTICACION CON PASSPORT
all_countriesController.getall_countries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get all_countries`);
    ObjLog.log(`[${context}]: Sending service to get all_countries`);

    all_countriesService.getall_countries(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default all_countriesController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ip_countriesService from "../services/ip_countries.service";

const ip_countriesController = {};
const context = "ip_countries Controller";

//AUTENTICACION CON PASSPORT
ip_countriesController.getid_by_name = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get ip_countries`);
    ObjLog.log(`[${context}]: Sending service to get ip_countries`);

    ip_countriesService.getid_by_name(req, res, next);
  } catch (error) {
    next(error);
  }
};

ip_countriesController.getip_countries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get ip_countries`);
    ObjLog.log(`[${context}]: Sending service to get ip_countries`);

    ip_countriesService.getip_countries(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default ip_countriesController;

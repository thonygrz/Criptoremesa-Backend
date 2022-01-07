import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import destinyCountriesService from "../services/destiny_countries.service";

const destinyCountriesController = {};
const context = "destiny Countries Controller";

//AUTENTICACION CON PASSPORT
destinyCountriesController.getDestinyCountries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get destiny Countries`);
    ObjLog.log(`[${context}]: Sending service to get destiny Countries`);

    destinyCountriesService.getDestinyCountries(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default destinyCountriesController;

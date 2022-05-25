import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import countriesService from "../services/countries.service";

const countriesController = {};
const context = "countries Controller";

//AUTENTICACION CON PASSPORT
countriesController.getDestinyCountries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get destiny Countries`);
    ObjLog.log(`[${context}]: Sending service to get destiny Countries`);

    countriesService.getDestinyCountries(req, res, next);
  } catch (error) {
    next(error);
  }
};

countriesController.countriesCurrencies = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get countries and currencies`);
    ObjLog.log(`[${context}]: Sending service to get countries and currencies`);

    countriesService.countriesCurrencies(req, res, next);
  } catch (error) {
    next(error);
  }
};

countriesController.getCountriesByPayMethod = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get countries by pay methods`);
    ObjLog.log(`[${context}]: Sending service to get countries by pay methods`);

    countriesService.getCountriesByPayMethod(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default countriesController;

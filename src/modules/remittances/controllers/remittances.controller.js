import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import remittancesService from "../services/remittances.service";
const remittancesController = {};
const context = "remittances Controller";

remittancesController.notificationTypes = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get notification types`);
    ObjLog.log(`[${context}]: Sending service to get notification types`);

    remittancesService.notificationTypes(req, res, next);
  } catch (error) {
    next(error);
  }
};

remittancesController.getRemittances = (req, res, next) => {
  const userEmail = req.params.email_user;
  try {
    logger.info(`[${context}]: Sending service to get All ${userEmail} remittances`);
    ObjLog.log(`[${context}]: Sending service to get All ${userEmail} remittances`);

    remittancesService.getRemittances(req, res, next,userEmail);
  } catch (error) {
    next(error);
  }
};

remittancesController.limitationsByCodPub = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get limitations`);
    ObjLog.log(`[${context}]: Sending service to get limitations`);

    remittancesService.limitationsByCodPub(req, res, next);
  } catch (error) {
    next(error);
  }
};

remittancesController.startRemittance = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to start remittance`);
    ObjLog.log(`[${context}]: Sending service to start remittance`);

    remittancesService.startRemittance(req, res, next);
  } catch (error) {
    next(error);
  }
};

remittancesController.countriesCurrencies = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get countries and currencies`);
    ObjLog.log(`[${context}]: Sending service to get countries and currencies`);

    remittancesService.countriesCurrencies(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default remittancesController;

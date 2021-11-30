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

veriflevelsController.notifications = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get notifications`);
    ObjLog.log(`[${context}]: Sending service to get notifications`);

    veriflevelsService.notifications(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.deactivateNotification = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to deactivate notification`);
    ObjLog.log(`[${context}]: Sending service to deactivate notification`);

    veriflevelsService.deactivateNotification(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.readNotification = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to read notification`);
    ObjLog.log(`[${context}]: Sending service to read notification`);

    veriflevelsService.readNotification(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.getWholesalePartnerRequestsCountries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get countries`);
    ObjLog.log(`[${context}]: Sending service to get countries`);
    veriflevelsService.getWholesalePartnerRequestsCountries(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.getMigrationStatus = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get migration status`);
    ObjLog.log(`[${context}]: Sending service to get migration status`);
    veriflevelsService.getMigrationStatus(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.getDisapprovedVerifLevelsRequirements = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get Disapproved VerifLevels Requirements`);
    ObjLog.log(`[${context}]: Sending service to get Disapproved VerifLevels Requirements`);
    veriflevelsService.getDisapprovedVerifLevelsRequirements(req, res, next);
  } catch (error) {
    next(error);
  }
};

veriflevelsController.getDisapprovedWholesalePartnersRequirements = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get Disapproved VerifLevels Requirements`);
    ObjLog.log(`[${context}]: Sending service to get Disapproved VerifLevels Requirements`);
    veriflevelsService.getDisapprovedWholesalePartnersRequirements(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default veriflevelsController;

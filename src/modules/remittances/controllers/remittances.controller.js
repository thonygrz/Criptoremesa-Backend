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


export default remittancesController;

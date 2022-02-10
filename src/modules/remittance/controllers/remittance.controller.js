import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import remittancesService from "../services/remittance.service";

const remittanceController = {};
const context = "remittance Controller";

remittanceController.getRemittances = (req, res, next) => {
  const userEmail = req.params.email_user;
  try {
    logger.info(`[${context}]: Sending service to get All ${userEmail} remittances`);
    ObjLog.log(`[${context}]: Sending service to get All ${userEmail} remittances`);

    remittancesService.getRemittances(req, res, next,userEmail);
  } catch (error) {
    next(error);
  }
};


export default remittanceController;

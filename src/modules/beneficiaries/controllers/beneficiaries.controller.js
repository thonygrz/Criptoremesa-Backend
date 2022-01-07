import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesService from "../services/beneficiaries.service";

const beneficiariesController = {};
const context = "beneficiaries Controller";

beneficiariesController.getUserFrequentBeneficiaries = (req, res, next) => {
  const userEmail = req.query.email_user;
  try {
    logger.info(`[${context}]: Sending service to get All ${userEmail} frequent Beneficiaries`);
    ObjLog.log(`[${context}]: Sending service to get All ${userEmail} frequent Beneficiaries`);

    beneficiariesService.getUserFrequentBeneficiaries(req, res, next,userEmail);
  } catch (error) {
    next(error);
  }
};

export default beneficiariesController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesService from "../services/beneficiaries.service";

const beneficiariesController = {};
const context = "beneficiaries Controller";

beneficiariesController.getUserFrequentBeneficiaries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get All user frequent Beneficiaries`);
    ObjLog.log(`[${context}]: Sending service to get All user frequent Beneficiaries`);

    beneficiariesService.getUserFrequentBeneficiaries(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default beneficiariesController;

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

beneficiariesController.createFrequentBeneficiary = (req,res,next) =>{
  const userEmail = req.query.email_user;
  try {
    logger.info(`[${context}]: Sending service to insert ${userEmail} frequent Beneficiary`);
    ObjLog.log(`[${context}]: Sending service to insert ${userEmail} frequent Beneficiary`);
    beneficiariesService.createFrequentBeneficiary(req, res, next,userEmail);
  } catch (error) {
    next(error);
  }
}

beneficiariesController.deleteFrequentBeneficiary = (req,res,next) =>{
  try {
    let beneficiary = req.params.beneficiaryId;

    logger.info(`[${context}]: Sending service to delete frequent Beneficiary`);
    ObjLog.log(`[${context}]: Sending service to delete frequent Beneficiary`);

    beneficiariesService.deleteFrequentBeneficiary(req, res, next,beneficiary);
  } catch (error) {
    next(error);
  }
}

beneficiariesController.updateFrequentBeneficiary = (req,res,next) =>{
  try {
    logger.info(`[${context}]: Sending service to update frequent Beneficiary`);
    ObjLog.log(`[${context}]: Sending service to update frequent Beneficiary`);

    beneficiariesService.updateFrequentBeneficiary(req, res, next);
  } catch (error) {
    next(error);
  }
}

export default beneficiariesController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesRepository from "../repositories/beneficiaries.pg.repository";

const beneficiariesService = {};
const context = "beneficiaries Service";

beneficiariesService.getUserFrequentBeneficiaries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting ${req.query.email_user} frequent beneficiaries`);
    ObjLog.log(`[${context}]: Getting ${req.query.email_user} frequent beneficiaries`);
    let data = await beneficiariesRepository.getUserFrequentBeneficiaries(req.params.email_user);
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

beneficiariesService.createFrequentBeneficiary = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Creating frequent beneficiary for ${req.query.email_user}`);
    ObjLog.log(`[${context}]: Creating frequent beneficiary for ${req.query.email_user}`);
    let data = await beneficiariesRepository.createFrequentBeneficiary(req.body,req.body.email_user);
    if (data.id_beneficiary !== '')
      return {
        data,
        status: 200,
        success: true,
        failed: false
      }
    else 
      return {
        data,
        status: 500,
        success: false,
        failed: true
      }
  } catch (error) {
    next(error);
  }
};

beneficiariesService.deleteFrequentBeneficiary = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Deleting frequent beneficiary`);
    ObjLog.log(`[${context}]: Deleting frequent beneficiary`);
    let data = await beneficiariesRepository.deleteFrequentBeneficiary(req.params.beneficiaryId);
    if (data.sp_ms_frequents_beneficiaries_delete === parseInt(req.params.beneficiaryId)) 
      return {
        data: true,
        status: 200,
        success: true,
        failed: false
      }
    else 
      return {
        data: false,
        status: 200,
        success: false,
        failed: true
      }
  } catch (error) {
    next(error);
  }
};

beneficiariesService.updateFrequentBeneficiary = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Updating frequent beneficiary`);
    ObjLog.log(`[${context}]: Updating frequent beneficiary`);
    let data = await beneficiariesRepository.updateFrequentBeneficiary(req.body,req.params.beneficiaryId);
    if (data[0].sp_ms_frequents_beneficiaries_update === '')
      return {
        data: true,
        status: 200,
        success: true,
        failed: false
      }
    else 
      return {
        data: false,
        status: 200,
        success: false,
        failed: true
      }
  } catch (error) {
    next(error);
  }
};

export default beneficiariesService;

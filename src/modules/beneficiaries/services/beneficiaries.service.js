import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesRepository from "../repositories/beneficiaries.pg.repository";

const beneficiariesService = {};
const context = "beneficiaries Service";

beneficiariesService.getUserFrequentBeneficiaries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting ${req.query.email_user} frequent beneficiaries`);
    ObjLog.log(`[${context}]: Getting ${req.query.email_user} frequent beneficiaries`);
    let data = await beneficiariesRepository.getUserFrequentBeneficiaries(req.query.email_user);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

beneficiariesService.createFrequentBeneficiary = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Creating frequent beneficiary for ${req.query.email_user}`);
    ObjLog.log(`[${context}]: Creating frequent beneficiary for ${req.query.email_user}`);
    let data = await beneficiariesRepository.createFrequentBeneficiary(req.body,req.query.email_user);
    if (data.id_beneficiary !== '')
      res.status(200).json(data);
    else 
      res.status(500).json(data)
  } catch (error) {
    next(error);
  }
};

beneficiariesService.deleteFrequentBeneficiary = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Deleting frequent beneficiary`);
    ObjLog.log(`[${context}]: Deleting frequent beneficiary`);
    let data = await beneficiariesRepository.deleteFrequentBeneficiary(req.params.beneficiaryId);
    if (data.sp_ms_frequents_beneficiaries_delete === parseInt(req.params.beneficiaryId)) res.status(200).json(true);
    else res.status(200).json(false);
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
      res.status(200).json(true);
    else 
      res.status(500).json(false);
  } catch (error) {
    next(error);
  }
};

export default beneficiariesService;

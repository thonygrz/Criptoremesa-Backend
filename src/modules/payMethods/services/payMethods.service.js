import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import payMethodsRepository from "../repositories/payMethods.pg.repository";

const payMethodsService = {};
const context = "pay Methods Service";

payMethodsService.getPayMethodsByCountryAndCurrency = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting Pay Methods by Country and Currency`);
    ObjLog.log(`[${context}]: Getting Pay Methods by Country and Currency`);
    let data = await payMethodsRepository.getPayMethodsByCountryAndCurrency(req.query.id_country,req.query.id_currency,req.query.only_pay);
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

payMethodsService.getPayMethodById = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting Pay Methods by Country`);
    ObjLog.log(`[${context}]: Getting Pay Methods by Country`);
    let data = await payMethodsRepository.getPayMethodById(req.params.pay_method_id);
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

payMethodsService.deposit_method_by_country = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting deposit Methods by Country`);
    ObjLog.log(`[${context}]: Getting deposit Methods by Country`);
    let data = await payMethodsRepository.deposit_method_by_country(req.params.id_country,req.params.id_bank);
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

payMethodsService.depositMethodsByBank = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting Pay Method by bank`);
    ObjLog.log(`[${context}]: Getting Pay Method by bank`);
    let data = await payMethodsRepository.depositMethodsByBank(req.params.id_bank);
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

export default payMethodsService;
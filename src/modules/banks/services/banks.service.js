import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksRepository from "../repositories/banks.pg.repository";
import { env , ENVIROMENTS} from "../../../utils/enviroment"

const banksService = {};
const context = "banks Service";

banksService.getBanks = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);
    ObjLog.log(`[${context}]: Getting ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);

    let data
    if (req.query.origin === 'true')
      data = await banksRepository.getOriginBanks(req.query.country_id,req.query.pay_method_id,req.query.currency_id);
    else 
      data = await banksRepository.getDestinyBanks(req.query.country_id,req.query.pay_method_id,req.query.currency_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

banksService.getBankById = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting bank by id ${req.params.bankId}`);
    ObjLog.log(`[${context}]: Getting bank by id ${req.params.bankId}`);
    let data = await banksRepository.getBankById(req.params.bankId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountsById = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting bank accounts by id_country and id_currency`);
    ObjLog.log(`[${context}]: Getting bank accounts by id_country and id_currency`);
    let data = await banksRepository.getBankAccountsById({ 
                                                        id_country:  req.params.id_country,
                                                        id_currency: req.params.id_currency
                                                      });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountById = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting bank account by id`);
    ObjLog.log(`[${context}]: Getting bank account by id`);
    let data = await banksRepository.getBankAccountById(req.params.id_bank_account);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountByPayMethod = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting bank account by pay method`);
    ObjLog.log(`[${context}]: Getting bank account by pay method`);
    let data = await banksRepository.getBankAccountByPayMethod(req.params.id_pay_method);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

banksService.getBanksByPayMethod = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting banks by pay method`);
    ObjLog.log(`[${context}]: Getting banks by pay method`);
    authenticationPGRepository.insertLogMsg(log);
    let data = await banksRepository.getBanksByPayMethod(req.params.id_pay_method);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default banksService;

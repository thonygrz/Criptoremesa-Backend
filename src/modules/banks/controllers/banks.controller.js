import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksService from "../services/banks.service";

const banksController = {};
const context = "banks Controller";

//AUTENTICACION CON PASSPORT
banksController.getBanks = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get ${origin === true ? 'origin' : 'destiny'} banks`);
    ObjLog.log(`[${context}]: Sending service to get ${origin === true ? 'origin' : 'destiny'} banks`);

    banksService.getBanks(req, res, next);
  } catch (error) {
    next(error);
  }
};

banksController.getBankById = (req,res,next) =>{
  try {
    const bankId = req.params.bank_id;
    logger.info(`[${context}]: Sending service to get bank by Id ${bankId}`);
    ObjLog.log(`[${context}]: Sending service to get bank by Id ${bankId}`);

    banksService.getBankById(req, res, next,bankId);
  } catch (error) {
    next(error);
  }
}

banksController.getBankAccountsById = (req,res,next) =>{
  try {
    logger.info(`[${context}]: Sending service to get bank accounts`);
    ObjLog.log(`[${context}]: Sending service to get bank accounts`);

    banksService.getBankAccountsById(req, res, next);
  } catch (error) {
    next(error);
  }
}

export default banksController;

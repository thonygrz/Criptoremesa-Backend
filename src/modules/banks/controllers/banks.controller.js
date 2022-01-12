import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksService from "../services/banks.service";

const banksController = {};
const context = "banks Controller";

//AUTENTICACION CON PASSPORT
banksController.getBanks = (req, res, next) => {
  try {
    const countryId = req.query.country_id;
    const payMethodId = req.query.pay_method_id;
    const currencyId = req.query.currency_id;
    const origin = req.query.origin;
    logger.info(`[${context}]: Sending service to get ${origin === true ? 'origin' : 'destiny'} banks`);
    ObjLog.log(`[${context}]: Sending service to get ${origin === true ? 'origin' : 'destiny'} banks`);

    banksService.getBanks(req, res, next,countryId,payMethodId,currencyId,origin);
  } catch (error) {
    next(error);
  }
};

export default banksController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import balancesPGRepository from "../repositories/balances.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const balancesService = {};
const context = "balances Service";

balancesService.getBalances = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting balances`);
    ObjLog.log(`[${context}]: Getting balances`);
    data = await balancesPGRepository.getBalances(req.params.email_user);

    if (!data.balances) data.balances = []

      if (!data.balances.find(b => b.id_currency == data.resid_currency.id_currency)){
        data.balances.push({
            balance: 0,
            email_user: req.params.email_user,
            id_currency: data.resid_currency.id_currency,
            currency_name: data.resid_currency.currency_name,
            currency_type: data.resid_currency.currency_type,
            country_iso_code: data.resid_currency.country_iso_code,
            currency_iso_code: data.resid_currency.currency_iso_code,
        })
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default balancesService;

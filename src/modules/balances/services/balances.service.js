import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import balancesPGRepository from "../repositories/balances.pg.repository";
import currenciesPGRepository from "../../currencies/repositories/currencies.pg.repository";
const balancesService = {};
const context = "balances Service";

balancesService.getBalances = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting balances`);
    ObjLog.log(`[${context}]: Getting balances`);
    let data = await balancesPGRepository.getBalances(req.params.email_user);
    let currencyData = await currenciesPGRepository.getCurrenciesByType('crypto')

    console.log('currencyData',currencyData)

    if (data.resid_currency){
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
      currencyData.forEach(cu => {
        data.balances.push({
          balance: 0,
          email_user: req.params.email_user,
          id_currency: cu.id_currency,
          currency_name: cu.name,
          currency_type: cu.type,
          country_iso_code: null,
          currency_iso_code: cu.iso_cod,
        })
      });
    }
    
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

export default balancesService;

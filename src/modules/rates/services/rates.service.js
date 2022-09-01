import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ratesPGRepository from "../repositories/rates.pg.repository";
import { env } from "../../../utils/enviroment";
import {MANUAL_RATES} from '../constants/manualRates.constants'
import axios from 'axios'

const ratesService = {};
const context = "rates Service";
let events = {};

ratesService.rangeRates = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting range rates`);
    ObjLog.log(`[${context}]: Getting range rates`);
    let data = await ratesPGRepository.rangeRates();
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

ratesService.rateTypes = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting rate types`);
    ObjLog.log(`[${context}]: Getting rate types`);
    let data = await ratesPGRepository.rateTypes();
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

ratesService.userRates = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting user rates`);
    ObjLog.log(`[${context}]: Getting user rates`);
    let data = await ratesPGRepository.userRates(req.query,req.params.email_user);
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

ratesService.fullRates = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting full rates`);
    ObjLog.log(`[${context}]: Getting full rates`);

    let data = await ratesPGRepository.fullRates(req.query,req.params.email_user);

    let currentManualRate = data.manualRates.find(e => e.rate_type_name === MANUAL_RATES.VIPF )

    let fullRateFromAPI = (await axios.get(`https://api.currencyfreaks.com/latest?apikey=${env.CURRENCY_FREAKS_API_KEY}&symbols=${currentManualRate.currency_origin_iso_code}`)).data;
    
    if (fullRateFromAPI.rates[currentManualRate.currency_origin_iso_code]){
      data.localAmountLimit = currentManualRate.amount_limit * (fullRateFromAPI.rates[currentManualRate.currency_origin_iso_code] * 0.97)
      data.vipAcum = data.vipAcum * (fullRateFromAPI.rates[currentManualRate.currency_origin_iso_code] * 0.97)
      return {
        data,
        status: 200,
        success: true,
        failed: false
      }
    }
    else
      next({message: 'There was an error getting Currency Freaks rate.'})
  } catch (error) {
    next(error);
  }
};

ratesService.promo = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting promo rates`);
    ObjLog.log(`[${context}]: Getting promo rates`);
    let data = await ratesPGRepository.promo(req.query);
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

export default ratesService;
export { events };

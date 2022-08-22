import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import reportsPGRepository from "../repositories/reports.pg.repository";
import { env } from "../../../utils/enviroment";

import axios from 'axios'

const reportsService = {};
const context = "reports Service";

reportsService.reportAmountSentByBenef = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportAmountSentByBenef(
      req.params,
      req.query
    );

    if (data && data.length > 0) {
      let fullRateFromAPI = (await axios.get(`https://api.currencyfreaks.com/latest?apikey=${env.CURRENCY_FREAKS_API_KEY}&symbols=${data[0].currency_iso_code}`)).data;
      data.forEach(el => {
        el.dollar_sum = el.origin_sum / parseFloat(fullRateFromAPI.rates[el.currency_iso_code])
      })  
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

reportsService.reportAmountSentByCurrency = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportAmountSentByCurrency(
      req.params.email_user
    );
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

reportsService.reportTopFrequentBeneficiaries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportTopFrequentBeneficiaries(
      req.params.email_user
    );
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

reportsService.reportTopFrequentDestinations = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportTopFrequentDestinations(
      req.params.email_user
    );
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

reportsService.reportRemittancesByStatus = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportRemittancesByStatus(
      req.params.email_user
    );
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

reportsService.reportRemittancesByMonth = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportRemittancesByMonth(
      req.params.email_user,
      req.query.month
    );
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

reportsService.reportRatesTakenAdvantageOf = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.reportRatesTakenAdvantageOf(
      req.params.email_user
    );
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

reportsService.wholesalePartnersReports = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting report`);
    ObjLog.log(`[${context}]: Getting report`);
    let data = await reportsPGRepository.wholesalePartnersReports(
      req.params.slug
    );
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

export default reportsService;

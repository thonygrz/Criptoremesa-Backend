import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import reportsPGRepository from "../repositories/reports.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env, ENVIROMENTS } from "../../../utils/enviroment";
import axios from 'axios'
const reportsService = {};
const context = "reports Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/reports",
  session: null,
};

reportsService.reportAmountSentByBenef = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route =
      log.route + "/reports/users/:email_user/remittances/totalAmount";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportAmountSentByBenef(
        req.params,
        req.query
      );

      if (data.length > 0) {

        console.log('data: ',data)

        let fullRateFromAPI = (await axios.get(`https://api.currencyfreaks.com/latest?apikey=${env.CURRENCY_FREAKS_API_KEY}&symbols=${data[0].currency_iso_code}`)).data;
        console.log("🚀 ~ file: reports.service.js ~ line 53 ~ reportsService.reportAmountSentByBenef= ~ fullRateFromAPI", fullRateFromAPI)
        data.forEach(el => {
          el.dollar_sum = el.origin_sum / parseFloat(fullRateFromAPI.rates[el.currency_iso_code])
          console.log("🚀 ~ file: reports.service.js ~ line 56 ~ reportsService.reportAmountSentByBenef= ~ parseFloat(fullRateFromAPI.rates[el.currency_iso_code])", parseFloat(fullRateFromAPI.rates[el.currency_iso_code]))
        })  
      }

      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.reportAmountSentByCurrency = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route =
      log.route + "/reports/users/:email_user/remittances/totalAmount";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportAmountSentByCurrency(
        req.params.email_user
      );
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.reportTopFrequentBeneficiaries = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route =
      log.route + "/reports/users/:email_user/frequentBeneficiaries/top";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportTopFrequentBeneficiaries(
        req.params.email_user
      );
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.reportTopFrequentDestinations = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route =
      log.route + "/reports/users/:email_user/frequentDestinations/top";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportTopFrequentDestinations(
        req.params.email_user
      );
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.reportRemittancesByStatus = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route = log.route + "/reports/users/:email_user/remittances";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportRemittancesByStatus(
        req.params.email_user
      );
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.reportRemittancesByMonth = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route = log.route + "/reports/users/:email_user/remittances/month";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportRemittancesByMonth(
        req.params.email_user,
        req.query.month
      );
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.reportRatesTakenAdvantageOf = async (req, res, next) => {
  try {
    let log = logConst;
    log.is_auth = req.isAuthenticated();
    log.ip = req.connection.remoteAddress;
    log.route = log.route + "/reports/users/:email_user/remittances";
    let data = {};
    const resp = await authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else {
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting report`);
      ObjLog.log(`[${context}]: Getting report`);
      data = await reportsPGRepository.reportRatesTakenAdvantageOf(
        req.params.email_user
      );
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

export default reportsService;

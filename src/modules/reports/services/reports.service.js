import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import reportsPGRepository from "../repositories/reports.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
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

reportsService.usersWithMostTransactionsByRangeTimeAndCountry = async (req, res, next) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = '/usersWithMostTransactionsByRangeTimeAndCountry';
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Reports`);
      ObjLog.log(`[${context}]: Get Reports`);
      data = await reportsPGRepository.usersWithMostTransactionsByRangeTimeAndCountry(req.query.from_date,req.query.to_date,req.query.id_country);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

reportsService.usersWithMoneyTransferedByRangeTimeAndCountry = async (req, res, next) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = '/usersWithMoneyTransferedByRangeTimeAndCountry';
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Reports`);
      ObjLog.log(`[${context}]: Get Reports`);
      data = await reportsPGRepository.usersWithMoneyTransferedByRangeTimeAndCountry(req.query.from_date,req.query.to_date,req.query.id_country);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

export default reportsService;

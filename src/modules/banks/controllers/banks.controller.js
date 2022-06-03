import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksService from "../services/banks.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const banksController = {};
const context = "banks Controller";

// declaring log object
const logConst = {
  is_auth: null,
  success: true,
  failed: false,
  ip: null,
  country: null,
  route: null,
  session: null
};

banksController.getBanks = async (req, res, next) => {
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      req.session.destroy();
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      // calling service
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Sending service to get ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);
      ObjLog.log(`[${context}]: Sending service to get ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);

      banksService.getBanks(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

banksController.getBankById = async (req,res,next) =>{
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      req.session.destroy();
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      // calling service
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Sending service to get bank by Id ${req.params.bankId}`);
      ObjLog.log(`[${context}]: Sending service to get bank by Id ${req.params.bankId}`);

      banksService.getBankById(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

banksController.getBankAccountsById = async (req,res,next) =>{
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      req.session.destroy();
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      // calling service
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Sending service to get bank accounts`);
      ObjLog.log(`[${context}]: Sending service to get bank accounts`);

      banksService.getBankAccountsById(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

banksController.getBankAccountById = async (req,res,next) =>{
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      req.session.destroy();
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      // calling service
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Sending service to get bank account by id`);
      ObjLog.log(`[${context}]: Sending service to get bank account by id`);

      banksService.getBankAccountById(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

banksController.getBankAccountByPayMethod = async (req,res,next) =>{
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      req.session.destroy();
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      // calling service
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Sending service to get bank account by pay method`);
      ObjLog.log(`[${context}]: Sending service to get bank account by pay method`);

      banksService.getBankAccountByPayMethod(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

banksController.getBanksByPayMethod = async (req, res, next) => {
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      req.session.destroy();
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      // calling service
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Sending service to get banks by pay methods`);
      ObjLog.log(`[${context}]: Sending service to get banks by pay methods`);

      banksService.getBanksByPayMethod(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

export default banksController;

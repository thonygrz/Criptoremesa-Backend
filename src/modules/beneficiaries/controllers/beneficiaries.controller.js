import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesService from "../services/beneficiaries.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'

const beneficiariesController = {};
const context = "beneficiaries Controller";

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

beneficiariesController.getUserFrequentBeneficiaries = async (req, res, next) => {
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
      logger.info(`[${context}]: Sending service to get All ${req.query.email_user} frequent Beneficiaries`);
      ObjLog.log(`[${context}]: Sending service to get All ${req.query.email_user} frequent Beneficiaries`);

      beneficiariesService.getUserFrequentBeneficiaries(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

beneficiariesController.createFrequentBeneficiary = async (req,res,next) =>{
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
      logger.info(`[${context}]: Sending service to insert ${req.query.email_user} frequent Beneficiary`);
      ObjLog.log(`[${context}]: Sending service to insert ${req.query.email_user} frequent Beneficiary`);
      beneficiariesService.createFrequentBeneficiary(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

beneficiariesController.deleteFrequentBeneficiary = async (req,res,next) =>{
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
      logger.info(`[${context}]: Sending service to delete frequent Beneficiary`);
      ObjLog.log(`[${context}]: Sending service to delete frequent Beneficiary`);

      beneficiariesService.deleteFrequentBeneficiary(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

beneficiariesController.updateFrequentBeneficiary = async (req,res,next) =>{
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
      logger.info(`[${context}]: Sending service to update frequent Beneficiary`);
      ObjLog.log(`[${context}]: Sending service to update frequent Beneficiary`);

      beneficiariesService.updateFrequentBeneficiary(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

export default beneficiariesController;

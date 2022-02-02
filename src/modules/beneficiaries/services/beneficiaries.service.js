import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesRepository from "../repositories/beneficiaries.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const beneficiariesService = {};
const context = "beneficiaries Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/beneficiaries/",
  session: null,
};

beneficiariesService.getUserFrequentBeneficiaries = async (req, res, next,userEmail) => {
  try {
     let log  = logConst;
     log.route = log.route + 'frequentBeneficiaries'; 
     log.is_auth = req.isAuthenticated()
     log.ip = req.connection.remoteAddress
     const ipInfo = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
     if (ipInfo) log.country = ipInfo.country_name;
     if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
     if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
     }else{
        await authenticationPGRepository.insertLogMsg(log);
        logger.info(`[${context}]: Get ${userEmail} frequent beneficiaries`);
        ObjLog.log(`[${context}]: Get ${userEmail} frequent beneficiaries`);
        let data = await beneficiariesRepository.getUserFrequentBeneficiaries(userEmail);
        res.status(200).json(data);
     }
  } catch (error) {
    next(error);
  }
};

beneficiariesService.createFrequentBeneficiary = async (req, res, next,userEmail) => {
  try {

    let log  = logConst;
    log.route = log.route + 'frequentBeneficiaries'; 
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }
    else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Create frequent beneficiary for ${userEmail}`);
      ObjLog.log(`[${context}]: Create frequent beneficiary for ${userEmail}`);
      let data = await beneficiariesRepository.createFrequentBeneficiary(req.body,userEmail);
      if (data.id_beneficiary !== '')
        res.status(200).json(true);
      else 
        res.status(500).json(false)
    }
  } catch (error) {
    next(error);
  }
};
beneficiariesService.deleteFrequentBeneficiary = async (req, res, next,beneficiaryId) => {
  try {

    let log  = logConst;
    log.route = log.route + 'frequentBeneficiaries'; 
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.failed = true;
      log.success = false;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }
    else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Delete frequent beneficiary`);
      ObjLog.log(`[${context}]: Delete frequent beneficiary`);
      let data = await beneficiariesRepository.deleteFrequentBeneficiary(beneficiaryId);
      if (data.sp_ms_frequents_beneficiaries_delete === parseInt(beneficiaryId)) res.status(200).json(true);
      else res.status(200).json(false);
    }
  } catch (error) {
    next(error);
  }
};
beneficiariesService.updateFrequentBeneficiary = async (req, res, next,beneficiaryId) => {
  try {
    let log  = logConst;
    log.route = log.route + 'frequentBeneficiaries'; 
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }
    else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Update frequent beneficiary`);
      ObjLog.log(`[${context}]: Update frequent beneficiary`);
      let data = await beneficiariesRepository.updateFrequentBeneficiary(req.body,beneficiaryId);
      if (data[0].sp_ms_frequents_beneficiaries_update === '')
        res.status(200).json(true);
      else 
        res.status(500).json(false);
    }
  } catch (error) {
    next(error);
  }
};
//req.params.id
export default beneficiariesService;

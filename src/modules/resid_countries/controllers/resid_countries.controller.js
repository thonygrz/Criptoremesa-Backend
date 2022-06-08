import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import resid_countriesService from "../services/resid_countries.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env,ENVIROMENTS } from "../../../utils/enviroment";

const resid_countriesController = {};
const context = "resid_countries Controller";

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

resid_countriesController.getresid_countries = async (req, res, next) => {
  try {
    // filling log object info
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    // calling service
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    let finalResp = await resid_countriesService.getresid_countries(req, res, next);
    
    if (finalResp) {
      //logging on DB
      log.success = finalResp.success
      log.failed = finalResp.failed
      await authenticationPGRepository.insertLogMsg(log);

      //sendind response to FE
      res.status(finalResp.status).json(finalResp.data);
    }
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getISOCodeById = async (req, res, next) => {
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
      logger.info(`[${context}]: Sending service to get resid_countries`);
      ObjLog.log(`[${context}]: Sending service to get resid_countries`);

      let finalResp = await resid_countriesService.getISOCodeById(req, res, next);

      if (finalResp) {
        //logging on DB
        log.success = finalResp.success
        log.failed = finalResp.failed
        await authenticationPGRepository.insertLogMsg(log);

        //sendind response to FE
        res.status(finalResp.status).json(finalResp.data);
      }
    }
  } catch (error) {
    next(error);
  }
};

resid_countriesController.isPolExp = async (req, res, next) => {
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
      logger.info(`[${context}]: Sending service to get pol exp country`);
      ObjLog.log(`[${context}]: Sending service to get pol exp country`);

      let finalResp = await resid_countriesService.isPolExp(req, res, next);

      if (finalResp) {
        //logging on DB
        log.success = finalResp.success
        log.failed = finalResp.failed
        await authenticationPGRepository.insertLogMsg(log);

        //sendind response to FE
        res.status(finalResp.status).json(finalResp.data);
      }
    }
  } catch (error) {
    next(error);
  }
};

export default resid_countriesController;

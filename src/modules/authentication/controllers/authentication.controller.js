import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import authenticationService from "../services/authentication.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const authenticationController = {};
const context = "Authentication Controller";


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

//AUTENTICACION CON PASSPORT
authenticationController.login = (req, res, next) => {
  try {
    // Se llena la información del log
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    logger.info(`[${context}]: Sending service to login`);
    ObjLog.log(`[${context}]: Sending service to login`);

    authenticationService.login(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationController.logout = (req, res, next) => {
  try {
    // Se llena la información del log
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    logger.info(`[${context}]: Sending service to logout`);
    ObjLog.log(`[${context}]: Sending service to logout`);

    authenticationService.logout(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationController.protected = (req, res, next) => {
  try {
    logger.info(`[${context}]: Protected`);
    ObjLog.log(`[${context}]: Protected`);

    authenticationService.protected(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default authenticationController;

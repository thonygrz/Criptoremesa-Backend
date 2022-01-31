import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import resid_countriesService from "../services/resid_countries.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const resid_countriesController = {};
const context = "resid_countries Controller";
let sess = null;

//AUTENTICACION CON PASSPORT
resid_countriesController.getresid_countries = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getresid_countries(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getresid_countriesClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getresid_countriesClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getid_by_name = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get resid_countries`);
    ObjLog.log(`[${context}]: Sending service to get resid_countries`);

    resid_countriesService.getid_by_name(req, res, next);
  } catch (error) {
    next(error);
  }
};

resid_countriesController.getISOCodeById = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()){
      req.session.destroy();
  
      const resp = authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      let countryResp = null;
      sess = null;
  
      if (resp) countryResp = resp.country_name;
  
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;
  
      const log = {
        is_auth: req.isAuthenticated(),
        success: false,
        failed: true,
        ip: req.connection.remoteAddress,
        country: countryResp,
        route: "/getISOCodeById",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    } else {
      logger.info(`[${context}]: Sending service to get resid_countries`);
      ObjLog.log(`[${context}]: Sending service to get resid_countries`);

      resid_countriesService.getISOCodeById(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

resid_countriesController.isPolExp = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()){
      req.session.destroy();
  
      const resp = authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      let countryResp = null;
      sess = null;
  
      if (resp) countryResp = resp.country_name;
  
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;
  
      const log = {
        is_auth: req.isAuthenticated(),
        success: false,
        failed: true,
        ip: req.connection.remoteAddress,
        country: countryResp,
        route: "/isPolExp",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    } else {
      logger.info(`[${context}]: Sending service to get pol exp country`);
      ObjLog.log(`[${context}]: Sending service to get pol exp country`);

      resid_countriesService.isPolExp(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

export default resid_countriesController;

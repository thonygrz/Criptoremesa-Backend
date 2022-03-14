import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import reportsService from "../services/reports.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const reportsController = {};
const context = "reports Controller";

let sess = null;

reportsController.usersWithMostTransactionsByRangeTimeAndCountry = async (req, res, next) => {
  try {
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
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
        route: "/usersWithMostTransactionsByRangeTimeAndCountry",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(401).json({ message: "Unauthorized" });
    } else {
      logger.info(`[${context}]: Sending service to get reports`);
      ObjLog.log(`[${context}]: Sending service to get reports`);

      reportsService.usersWithMostTransactionsByRangeTimeAndCountry(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

reportsController.usersWithMoneyTransferedByRangeTimeAndCountry = async (req, res, next) => {
  try {
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
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
        route: "/usersWithMoneyTransferedByRangeTimeAndCountry",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(401).json({ message: "Unauthorized" });
    } else {
      logger.info(`[${context}]: Sending service to get reports`);
      ObjLog.log(`[${context}]: Sending service to get reports`);

      reportsService.usersWithMoneyTransferedByRangeTimeAndCountry(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

export default reportsController;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import cryptomilesService from "../services/cryptomiles.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const cryptomilesController = {};
const context = "cryptomiles Controller";

let sess = null;

cryptomilesController.insertCryptomile = async (req, res, next) => {
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
        route: "/cryptomiles",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(401).json({ message: "Unauthorized" });
    } else {
      logger.info(`[${context}]: Sending service to insert cryptomile`);
      ObjLog.log(`[${context}]: Sending service to insert cryptomile`);

      cryptomilesService.insertCryptomile(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

export default cryptomilesController;

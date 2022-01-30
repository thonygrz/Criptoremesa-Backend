import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import all_countriesService from "../services/all_countries.service";

const all_countriesController = {};
const context = "all_countries Controller";

//AUTENTICACION CON PASSPORT
all_countriesController.getall_countries = async (req, res, next) => {
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
        route: "/getActive",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    } else {
      logger.info(`[${context}]: Sending service to get all_countries`);
      ObjLog.log(`[${context}]: Sending service to get all_countries`);

      all_countriesService.getall_countries(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};

export default all_countriesController;

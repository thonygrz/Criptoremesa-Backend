import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import countryStatesRepository from "../repositories/states.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const countryStatesService = {};
const context = "countries States Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/countries/states",
  session: null,
};

countryStatesService.getStatesByCountryId = async (req, res, next,countryId) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }
    else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Country States By Id ${countryId}`);
      ObjLog.log(`[${context}]: Get Country States By Id ${countryId}`);
      let data = await countryStatesRepository.getStatesByCountryId(countryId);  
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

export default countryStatesService;

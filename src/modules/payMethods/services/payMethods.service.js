import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import payMethodsRepository from "../repositories/payMethods.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const payMethodsService = {};
const context = "pay Methods Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/pay_methods",
  session: null,
};

payMethodsService.getPayMethodsByCountry = async (req, res, next,countryId,origin) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated()){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }
    else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Pay Methods by Country`);
      ObjLog.log(`[${context}]: Get Pay Methods by Country`);
      data = await payMethodsRepository.getPayMethodsByCountry(countryId);
      res.status(200).json(data);
    }
    
  } catch (error) {
    next(error);
  }
};

payMethodsService.getPayMethodById = async (req, res, next,payMethodId) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated()){
      log.failed = true;
      log.success = false
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Pay Method by Id ${payMethodId}`);
      ObjLog.log(`[${context}]: Get Pay Method by Id ${payMethodId}`);
      data = await payMethodsRepository.getPayMethodById(payMethodId);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};
export default payMethodsService;

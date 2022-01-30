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
    logger.info(`[${context}]: Get Pay Methods by Country`);
    ObjLog.log(`[${context}]: Get Pay Methods by Country`);
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
    data = await payMethodsRepository.getPayMethodsByCountry(countryId);
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

payMethodsService.getPayMethodById = async (req, res, next,payMethodId) => {
  try {
    logger.info(`[${context}]: Get Pay Method by Id ${payMethodId}`);
    ObjLog.log(`[${context}]: Get Pay Method by Id ${payMethodId}`);
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
    data = await payMethodsRepository.getPayMethodById(payMethodId);
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export default payMethodsService;

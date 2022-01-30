import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksRepository from "../repositories/banks.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const banksService = {};
const context = "banks Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/banks",
  session: null,
};

banksService.getBanks = async (req, res, next,countryId,payMethodId,currencyId,origin) => {
  try {
    logger.info(`[${context}]: Get ${origin === true ? 'origin' : 'destiny'} banks`);
    ObjLog.log(`[${context}]: Get ${origin === true ? 'origin' : 'destiny'} banks`);
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
    if (origin === true)
      data = await banksRepository.getOriginBanks(countryId,payMethodId,currencyId);
    else 
      data = await banksRepository.getDestinyBanks(countryId,payMethodId,currencyId);
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

banksService.getBankById = async (req, res, next,bankId) => {
  try {
    logger.info(`[${context}]: Get bank by id ${bankId}`);
    ObjLog.log(`[${context}]: Get bank by id ${bankId}`);
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
      data = await banksRepository.getBankById(bankId);
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export default banksService;

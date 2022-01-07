import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import destinyCountriesRepository from "../repositories/currencies.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const currenciesService = {};
const context = "destiny Countries Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/currencies",
  session: undefined,
};

currenciesService.getCurrenciesByCountry = async (req, res, next,countryId,origin) => {
  try {
    logger.info(`[${context}]: Get currencies by Country`);
    ObjLog.log(`[${context}]: Get currencies by Country`);
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    let data = {}
    if (origin === true)
      data = await destinyCountriesRepository.getOriginCurrenciesByCountry(countryId);
    else 
      data = await destinyCountriesRepository.getDestinyCurrenciesByCountry(countryId);
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default currenciesService;

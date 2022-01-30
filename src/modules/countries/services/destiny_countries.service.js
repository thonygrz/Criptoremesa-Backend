import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import destinyCountriesRepository from "../repositories/destiny_countries.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const desintCountriesService = {};
const context = "destiny Countries Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/countries/destiny",
  session: null,
};

desintCountriesService.getDestinyCountries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Get destiny Countries`);
    ObjLog.log(`[${context}]: Get destiny Countries`);
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress
    let data = await destinyCountriesRepository.getDestinyCountries();
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default desintCountriesService;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import currencyRepository from "../repositories/currencies.pg.repository";
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
  session: null,
};

currenciesService.getCurrenciesByCountry = async (req, res, next,countryId,origin) => {
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
      log.success = false;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }
    else{
        await authenticationPGRepository.insertLogMsg(log);
        logger.info(`[${context}]: Get currencies by Country`);
        ObjLog.log(`[${context}]: Get currencies by Country`);
        if (origin === true)
        data = await currencyRepository.getOriginCurrenciesByCountry(countryId);
      else 
        data = await currencyRepository.getDestinyCurrenciesByCountry(countryId);
        res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};



export default currenciesService;

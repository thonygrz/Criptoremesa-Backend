import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import countriesRepository from "../repositories/countries.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const countriesService = {};
const context = "countries Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/countries/destiny",
  session: null,
};

countriesService.getDestinyCountries = async (req, res, next) => {
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
      logger.info(`[${context}]: Get destiny Countries`);
      ObjLog.log(`[${context}]: Get destiny Countries`);
      let data = await countriesRepository.getDestinyCountries();  
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

countriesService.countriesCurrencies = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;
    let data = await countriesRepository.countriesCurrencies(req.query.email_user ? req.query.email_user : null);
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/countries/countriesCurrencies",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default countriesService;

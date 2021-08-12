import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ip_countriesPGRepository from "../repositories/ip_countries.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const ip_countriesService = {};
const context = "ip_countries Service";

ip_countriesService.getip_countries = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await ip_countriesPGRepository.getip_countries();

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
      route: "/ip_countries/getActive",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ip_countriesService.getid_by_name = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await ip_countriesPGRepository.getid_by_name(req.params.id);

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
      route: "/ip_countries/getIdByName/:id",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ip_countriesService.getip_countriesClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await ip_countriesPGRepository.getip_countriesClient();

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
      route: "/ip_countries/getActiveClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ip_countriesService.getid_by_nameClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await ip_countriesPGRepository.getid_by_nameClient(
      req.params.id
    );

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
      route: "/ip_countries/getIdByName/:id",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default ip_countriesService;

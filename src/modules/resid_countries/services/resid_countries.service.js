import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import resid_countriesPGRepository from "../repositories/resid_countries.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const resid_countriesService = {};
const context = "resid_countries Service";

resid_countriesService.getresid_countries = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await resid_countriesPGRepository.getresid_countries();

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/resid_countries/getActive",
      session: sess,
    };

    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

resid_countriesService.getresid_countriesClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await resid_countriesPGRepository.getresid_countriesClient();

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/resid_countries/getActiveClient",
      session: sess,
    };

    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

resid_countriesService.getid_by_name = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await resid_countriesPGRepository.getid_by_name(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;

    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/resid_countries/getIdByName/:id",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default resid_countriesService;

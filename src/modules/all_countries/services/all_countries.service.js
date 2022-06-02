import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import all_countriesPGRepository from "../repositories/all_countries.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const all_countriesService = {};
const context = "all_countries Service";

// Se declara el objeto de Log
const logConst = {
  is_auth: null,
  success: true,
  failed: false,
  ip: null,
  country: null,
  route: null,
  session: null
};

all_countriesService.getall_countries = async (req, res, next) => {
  try {
    // Se llena la información del log
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name ? resp.country_name : 'Probably Localhost';
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    let data

    authenticationPGRepository.insertLogMsg(log);
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);
    data = await all_countriesPGRepository.getall_countries();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default all_countriesService;

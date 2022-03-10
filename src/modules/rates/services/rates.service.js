import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ratesPGRepository from "../repositories/rates.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env } from "../../../utils/enviroment";

const ratesService = {};
const context = "rates Service";
let events = {};

ratesService.rangeRates = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.rangeRates();
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
      route: "/rates/rangeRates",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ratesService.rateTypes = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.rateTypes();
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
      route: "/rates/rateTypes",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ratesService.userRates = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.userRates(req.query);
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
      route: "/rates/userRates",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default ratesService;
export { events };

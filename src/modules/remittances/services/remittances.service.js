import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import remittancesPGRepository from "../repositories/remittances.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'

const remittancesService = {};
const context = "remittances Service";
let events = {};
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/remittance/",
  session: null,
};

remittancesService.notificationTypes = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.notificationTypes();
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
      route: "/remittances/notificationTypes",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.getRemittances = async (req, res, next,userEmail) => {
  try {
     let log  = logConst;
     log.route = log.route + ':email_user'; 
     log.is_auth = req.isAuthenticated()
     log.ip = req.connection.remoteAddress
     const ipInfo = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
     if (ipInfo) log.country = ipInfo.country_name;
     if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
     if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
     }else{
        await authenticationPGRepository.insertLogMsg(log);
        logger.info(`[${context}]: Get ${userEmail} remittances`);
        ObjLog.log(`[${context}]: Get ${userEmail} remittances`);
        let data = await remittancesPGRepository.getRemittances(userEmail);
        res.status(200).json(data);
     }
  } catch (error) {
    next(error);
  }
};

remittancesService.limitationsByCodPub = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.limitationsByCodPub(req.params.cust_cr_cod_pub);
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
      route: "/remittances/limitationsByCodPub",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.startRemittance = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.startRemittance(req.body);
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
      route: "/remittances/",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.startPreRemittance = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.startPreRemittance(req.body);
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
      route: "/remittances/pre-remittance",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default remittancesService;
export { events };

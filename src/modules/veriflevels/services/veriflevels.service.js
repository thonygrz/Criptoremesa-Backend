import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import veriflevelsPGRepository from "../repositories/veriflevels.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const veriflevelsService = {};
const context = "veriflevels Service";

veriflevelsService.getveriflevels = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await veriflevelsPGRepository.getveriflevels(req.body);

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
      route: "/veriflevels/getActive",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.requestWholesalePartner = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.requestWholesalePartner({
      reasons: req.body.reasons,
      strenghts: req.body.strenghts,
      remittance_service: req.body.remittance_service,
      old_resid_client_countries: req.body.old_resid_client_countries.join(),
      profession: req.body.profession,
      resid_country_and_migration_status: req.body.resid_country_and_migration_status,
      new_resid_client_countries: req.body.new_resid_client_countries.join(),
      clients_number: req.body.clients_number.toString(),
      monthly_amount: req.body.monthly_amount,
      monetary_growth: req.body.monetary_growth,
      clients_growth: req.body.clients_growth.toString(),
      bussiness_name: req.body.bussiness_name,
      web_page_exp: req.body.web_page_exp,
      logo: req.body.logo,
      email_user: req.body.email_user,
    });

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
      route: "/veriflevels/requestWholesalePartner",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.notifications = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.notifications(req.params.email_user);

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
      route: "/veriflevels/notifications",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    if (dbResp === null)
      res.status(200).json([]);
    else
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.deactivateNotification = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.deactivateNotification(req.params.id);

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
      route: "/veriflevels/deactivateNotification",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.readNotification = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.readNotification(req.params.id);

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
      route: "/veriflevels/readNotification",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

export default veriflevelsService;

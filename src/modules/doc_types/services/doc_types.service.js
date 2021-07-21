import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import doc_typesPGRepository from "../repositories/repositories.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const doc_typesService = {};
const context = "doc_types Service";

doc_typesService.getdoc_types = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await doc_typesPGRepository.getdoc_types();

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
      route: "/doc_types/getActive",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

doc_typesService.getdoc_typesClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await doc_typesPGRepository.getdoc_typesClient();

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
      route: "/doc_types/getActiveClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

doc_typesService.getDocTypesLevelOne = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await doc_typesPGRepository.getDocTypesLevelOne();

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
      route: "/doc_types/getByIdResidCountry",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default doc_typesService;

import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import doc_typesPGRepository from "../repositories/doc_types.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const doc_typesService = {};
const context = "doc_types Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/doc_types",
  session: null,
};

doc_typesService.getDocTypes = async (req, res, next) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route+'/getActive';
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Doc Types`);
      ObjLog.log(`[${context}]: Get Doc Types`);
      data = await doc_typesPGRepository.getDocTypes();
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

doc_typesService.getDocTypeById = async (req, res, next,docTypeId) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route+'/:id_doc_type';
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
    }
    else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Doc Types`);
      ObjLog.log(`[${context}]: Get Doc Types`);
      data = await doc_typesPGRepository.getDocTypeById(docTypeId);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};


export default doc_typesService;

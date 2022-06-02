import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import cryptomilesPGRepository from "../repositories/cryptomiles.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'

const cryptomilesService = {};
const context = "cryptomiles Service";

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

cryptomilesService.insertCryptomile = async (req, res, next) => {
  try {
    // Se llena la información del log
    let log  = logConst;

    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = req.method + ' ' + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;

    let data

    // se protege la ruta en produccion mas no en desarrollo
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Inserting Cryptomile`);
      ObjLog.log(`[${context}]: Inserting Cryptomile`);
      data = await cryptomilesPGRepository.insertCryptomile(req.body);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.getCryptomiles = async (req, res, next) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route;
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
      logger.info(`[${context}]: Getting Cryptomiles`);
      ObjLog.log(`[${context}]: Getting Cryptomiles`);
      data = await cryptomilesPGRepository.getCryptomiles(req.params.email_user);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.deactivateCryptomiles = async (req, res, next) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route;
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
      logger.info(`[${context}]: Inserting Cryptomile`);
      ObjLog.log(`[${context}]: Inserting Cryptomile`);
      data = await cryptomilesPGRepository.deactivateCryptomiles(req.params.email_user);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.activateCryptomiles = async (req, res, next) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route;
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
      logger.info(`[${context}]: Inserting Cryptomile`);
      ObjLog.log(`[${context}]: Inserting Cryptomile`);
      data = await cryptomilesPGRepository.activateCryptomiles(req.params.email_user);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.getAllCryptomiles = async (req, res, next) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route;
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
      logger.info(`[${context}]: Getting all Cryptomiles`);
      ObjLog.log(`[${context}]: Getting all Cryptomiles`);
      console.log('QUERY EN SERVICE',req.query)
      data = await cryptomilesPGRepository.getAllCryptomiles({
                                                              email_user: req.params.email_user,
                                                              ...req.query
                                                            });
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

export default cryptomilesService;
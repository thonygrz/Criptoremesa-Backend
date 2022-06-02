import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksRepository from "../repositories/banks.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env , ENVIROMENTS} from "../../../utils/enviroment"

const banksService = {};
const context = "banks Service";

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

banksService.getBanks = async (req, res, next) => {
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

    // se protege la ruta en produccion mas no en desarrollo
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);
      ObjLog.log(`[${context}]: Getting ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);
      if (req.query.origin === 'true')
        data = await banksRepository.getOriginBanks(req.query.country_id,req.query.pay_method_id,req.query.currency_id);
      else 
        data = await banksRepository.getDestinyBanks(req.query.country_id,req.query.pay_method_id,req.query.currency_id);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBankById = async (req, res, next,bankId) => {
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

    // se protege la ruta en produccion mas no en desarrollo
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting bank by id ${bankId}`);
      ObjLog.log(`[${context}]: Getting bank by id ${bankId}`);
      data = await banksRepository.getBankById(bankId);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountsById = async (req, res, next) => {
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

    // se protege la ruta en produccion mas no en desarrollo
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting bank accounts by id_country and id_currency`);
      ObjLog.log(`[${context}]: Getting bank accounts by id_country and id_currency`);
      data = await banksRepository.getBankAccountsById({ 
                                                          id_country:  req.params.id_country,
                                                          id_currency: req.params.id_currency
                                                        });
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountById = async (req, res, next) => {
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

    // se protege la ruta en produccion mas no en desarrollo
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
        logger.info(`[${context}]: Getting bank account by id`);
        ObjLog.log(`[${context}]: Getting bank account by id`);
        data = await banksRepository.getBankAccountById(req.params.id_bank_account);
        res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountByPayMethod = async (req, res, next) => {
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

    // se protege la ruta en produccion mas no en desarrollo
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Getting bank account by pay method`);
      ObjLog.log(`[${context}]: Getting bank account by pay method`);
      data = await banksRepository.getBankAccountByPayMethod(req.params.id_pay_method);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBanksByPayMethod = async (req, res, next) => {
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

      // se protege la ruta en produccion mas no en desarrollo
      if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
      }else{
        logger.info(`[${context}]: Getting banks by pay method`);
        ObjLog.log(`[${context}]: Getting banks by pay method`);
        authenticationPGRepository.insertLogMsg(log);
        data = await banksRepository.getBanksByPayMethod(req.params.id_pay_method);
        res.status(200).json(data);
      }
  } catch (error) {
    next(error);
  }
};

export default banksService;

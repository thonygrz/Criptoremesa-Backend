import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import banksRepository from "../repositories/banks.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env , ENVIROMENTS} from "../../../utils/enviroment"

const banksService = {};
const context = "banks Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/banks",
  session: null,
};

banksService.getBanks = async (req, res, next) => {
  try {
    console.log('REQ.QUERY: ',req.query)

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
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
      logger.info(`[${context}]: Get ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);
      ObjLog.log(`[${context}]: Get ${req.query.origin === 'true' ? 'origin' : 'destiny'} banks`);
      let data = {}
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
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
    }else{
        logger.info(`[${context}]: Get bank by id ${bankId}`);
        ObjLog.log(`[${context}]: Get bank by id ${bankId}`);
        await authenticationPGRepository.insertLogMsg(log);
        let data = {}
          data = await banksRepository.getBankById(bankId);
        res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountsById = async (req, res, next) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = "/banks/getBankAccountsById";
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
    }else{
        logger.info(`[${context}]: Get bank accounts`);
        ObjLog.log(`[${context}]: Get bank accounts`);
        await authenticationPGRepository.insertLogMsg(log);
        let data = {}
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
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = "/banks/getBankAccountById";
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
    }else{
        logger.info(`[${context}]: Get bank account by id`);
        ObjLog.log(`[${context}]: Get bank account by id`);
        await authenticationPGRepository.insertLogMsg(log);
        let data = {}
          data = await banksRepository.getBankAccountById(req.params.id_bank_account);
        res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBankAccountByPayMethod = async (req, res, next) => {
  try {
    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = "/banks/getBankAccountByPayMethod";
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
    }else{
        logger.info(`[${context}]: Get bank account by pay method`);
        ObjLog.log(`[${context}]: Get bank account by pay method`);
        await authenticationPGRepository.insertLogMsg(log);
        let data = {}
          data = await banksRepository.getBankAccountByPayMethod(req.params.id_pay_method);
        res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

banksService.getBanksByPayMethod = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;
    let data = await 
    banksRepository.getBanksByPayMethod(req.params.id_pay_method);
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
      route: "/banks",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default banksService;

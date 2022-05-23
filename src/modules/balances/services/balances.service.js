import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import balancesPGRepository from "../repositories/balances.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const balancesService = {};
const context = "balances Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/balances",
  session: null,
};

balancesService.getBalances = async (req, res, next) => {
  try {

    let log  = logConst;
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress;
    log.route = log.route;
    let data = {}
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    console.log("🚀 ~ file: balances.service.js ~ line 31 ~ balancesService.getBalances= ~ req.isAuthenticated()", req.isAuthenticated())
    if (!req.isAuthenticated()){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Doc Types`);
      ObjLog.log(`[${context}]: Get Doc Types`);
      data = await balancesPGRepository.getBalances(req.params.email_user);

      if (!data.balances) data.balances = []

      // console.log('obj: ',data.balances.find(b => b.id_currency == data.resid_currency.id_currency))
      if (!data.balances.find(b => b.id_currency == data.resid_currency.id_currency)){
        data.balances.push({
            balance: 0,
            email_user: req.params.email_user,
            id_currency: data.resid_currency.id_currency,
            currency_name: data.resid_currency.currency_name,
            currency_type: data.resid_currency.currency_type,
            country_iso_code: data.resid_currency.country_iso_code,
            currency_iso_code: data.resid_currency.currency_iso_code,
        })
      }
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

export default balancesService;

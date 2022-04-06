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
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
      log.success = false;
      log.failed = true;
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    }else{
      await authenticationPGRepository.insertLogMsg(log);
      logger.info(`[${context}]: Get Doc Types`);
      ObjLog.log(`[${context}]: Get Doc Types`);
      data = await balancesPGRepository.getBalances(req.params.email_user,req.query.id_origin_country);
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
};

export default balancesService;

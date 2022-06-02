import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import balancesPGRepository from "../repositories/balances.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const balancesService = {};
const context = "balances Service";

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

balancesService.getBalances = async (req, res, next) => {
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
        logger.info(`[${context}]: Getting balances`);
        ObjLog.log(`[${context}]: Getting balances`);
        data = await balancesPGRepository.getBalances(req.params.email_user);

        if (!data.balances) data.balances = []

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

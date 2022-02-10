import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import remittancesRepository from "../repositories/remittance.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
const remittancesService = {};
const context = "remittance Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/remittance/",
  session: null,
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
        let data = await remittancesRepository.getRemittances(userEmail);
        res.status(200).json(data);
     }
  } catch (error) {
    next(error);
  }
};

export default remittancesService;

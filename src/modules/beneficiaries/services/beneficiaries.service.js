import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import beneficiariesRepository from "../repositories/beneficiaries.pg.repository";
import auth from "../../../utils/auth";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const beneficiariesService = {};
const context = "beneficiaries Service";
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/beneficiaries/",
  session: undefined,
};

beneficiariesService.getUserFrequentBeneficiaries = async (req, res, next,userEmail) => {
  try {
    logger.info(`[${context}]: Obtaining info and sending to repository`);
    ObjLog.log(`[${context}]: Obtaining info and sending to repository`);
    let log  = logConst;
    log.route = log.route + 'frequentBeneficiaries'; 
    log.is_auth = req.isAuthenticated()
    log.ip = req.connection.remoteAddress
    let data = await beneficiariesRepository.getUserFrequentBeneficiaries(userEmail);
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) log.country = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
    await authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default beneficiariesService;

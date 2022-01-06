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

beneficiariesService.getUserFrequentBeneficiaries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);
    let countryResp = null;
    let sess = null;
    let log  = logConst;
    log.route+='frequentBeneficiaries'; 

    let data = await beneficiariesRepository.getUserFrequentBeneficiaries();
    if (data.length > 0){

    }
    const resp = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID)) sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/beneficiaries/frequentBeneficiaries",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default beneficiariesService;

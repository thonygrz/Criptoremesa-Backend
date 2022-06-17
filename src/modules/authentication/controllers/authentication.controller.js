import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import authenticationService from "../services/authentication.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const authenticationController = {};
const context = "Authentication Controller";

// declaring log object
const logConst = {
  is_auth: null,
  success: true,
  failed: false,
  ip: null,
  country: null,
  route: null,
  session: null,
};

//PASSPORT AUTHENTICATION
authenticationController.login = async (req, res, next) => {
  try {
    // calling service
    logger.info(`[${context}]: Sending service to login`);
    ObjLog.log(`[${context}]: Sending service to login`);

    authenticationService.login(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationController.logout = async (req, res, next) => {
  try {
    // calling service
    logger.info(`[${context}]: Sending service to logout`);
    ObjLog.log(`[${context}]: Sending service to logout`);

    authenticationService.logout(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationController.protected = (req, res, next) => {
  try {
    logger.info(`[${context}]: Protected`);
    ObjLog.log(`[${context}]: Protected`);

    authenticationService.protected(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default authenticationController;

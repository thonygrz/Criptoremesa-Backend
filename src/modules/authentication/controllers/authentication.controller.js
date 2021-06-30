import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import authenticationService from "../services/authentication.service";

const authenticationController = {};
const context = "Authentication Controller";

//AUTENTICACION CON PASSPORT
authenticationController.login = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to login`);
    ObjLog.log(`[${context}]: Sending service to login`);

    authenticationService.login(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationController.logout = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to logout`);
    ObjLog.log(`[${context}]: Sending service to logout`);

    authenticationService.logout(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationController.signup = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to sign up`);
    ObjLog.log(`[${context}]: Sending service to sign up`);

    authenticationService.signup(req, res, next);
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

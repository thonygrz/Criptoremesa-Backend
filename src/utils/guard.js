import { Console } from "winston/lib/winston/transports";
import authenticationPGRepository from "../modules/authentication/repositories/authentication.pg.repository";
import { logger } from "./logger";
import ObjLog from "./ObjLog";
import ObjUserSessionData from "./ObjUserSessionData";

let guard = {};
const context = "Authentication Guard";

let usernameField = null;

guard.getUsernameField = () => {
  return usernameField;
};

guard.verifyAdmin = (uri) => {
  return async (req, res, next) => {
    try {
      logger.info(`[${context}]: Verifying User is an Admin`);
      ObjLog.log(`[${context}]: Verifying User is an Admin`);

      // IF YOU WANT TO RECEIVE A PARAM
      // console.log(uri);
      console.log("BODY: ", req.body.usernameField);
      usernameField = req.body.usernameField;

      const user = ObjUserSessionData.get().user;
      if (user && user.profile_name === "Admin") {
        logger.info(`[${context}]: Guard successfully passed`);
        ObjLog.log(`[${context}]: Guard successfully passed`);
        next();
      } else {
        logger.error(`[${context}]: Unauthorized`);
        ObjLog.log(`[${context}]: Unauthorized`);
        return res.status(403).send({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      next(error);
    }
  };
};

guard.verifyAnalist = (uri) => {
  return async (req, res, next) => {
    try {
      logger.info(`[${context}]: Verifying User is an Analist`);
      ObjLog.log(`[${context}]: Verifying User is an Analist`);

      // IF YOU WANT TO RECEIVE A PARAM
      // console.log(uri);

      usernameField = req.body.usernameField;

      const user = ObjUserSessionData.get().user;
      if (user && user.profile_name === "Analist") {
        logger.info(`[${context}]: Guard successfully passed`);
        ObjLog.log(`[${context}]: Guard successfully passed`);
        next();
      } else {
        logger.error(`[${context}]: Unauthorized`);
        ObjLog.log(`[${context}]: Unauthorized`);
        return res.status(403).send({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      next(error);
    }
  };
};

export default guard;
